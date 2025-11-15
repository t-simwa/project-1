import Message from '../models/Message.model.js';
import User from '../models/User.model.js';

// Generate thread ID from two user IDs
const generateThreadId = (userId1, userId2) => {
  return [userId1, userId2].sort().join('_');
};

// @desc    Get user's message threads
// @route   GET /api/messages/threads
// @access  Private
export const getMessageThreads = async (req, res, next) => {
  try {
    // Get all unique threads for the user
    const messages = await Message.find({
      $or: [
        { sender: req.user.id },
        { recipient: req.user.id }
      ]
    })
      .populate('sender', 'name avatar')
      .populate('recipient', 'name avatar')
      .sort({ createdAt: -1 });

    // Group by thread and get latest message per thread
    const threadsMap = new Map();

    messages.forEach(message => {
      const threadId = message.threadId;
      const otherUser = message.sender._id.toString() === req.user.id 
        ? message.recipient 
        : message.sender;

      if (!threadsMap.has(threadId)) {
        threadsMap.set(threadId, {
          threadId,
          otherUser,
          lastMessage: message,
          unreadCount: 0
        });
      } else {
        const thread = threadsMap.get(threadId);
        if (message.createdAt > thread.lastMessage.createdAt) {
          thread.lastMessage = message;
        }
      }

      // Count unread messages
      if (
        message.recipient._id.toString() === req.user.id &&
        !message.isRead
      ) {
        threadsMap.get(threadId).unreadCount++;
      }
    });

    const threads = Array.from(threadsMap.values());

    res.status(200).json({
      success: true,
      count: threads.length,
      data: { threads }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get messages in a thread
// @route   GET /api/messages/:threadId
// @access  Private
export const getMessages = async (req, res, next) => {
  try {
    const { threadId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    // Verify user is part of this thread
    const messages = await Message.find({ threadId })
      .populate('sender', 'name avatar')
      .populate('recipient', 'name avatar')
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(limit);

    if (messages.length > 0) {
      const firstMessage = messages[0];
      const isPartOfThread = 
        firstMessage.sender._id.toString() === req.user.id ||
        firstMessage.recipient._id.toString() === req.user.id;

      if (!isPartOfThread) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to view this thread'
        });
      }
    }

    // Mark messages as read
    await Message.updateMany(
      {
        threadId,
        recipient: req.user.id,
        isRead: false
      },
      { isRead: true }
    );

    const total = await Message.countDocuments({ threadId });

    res.status(200).json({
      success: true,
      count: messages.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: { messages }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Send message
// @route   POST /api/messages
// @access  Private
export const sendMessage = async (req, res, next) => {
  try {
    const { recipient, content, listing } = req.body;

    // Check if recipient exists
    const recipientUser = await User.findById(recipient);
    if (!recipientUser) {
      return res.status(404).json({
        success: false,
        message: 'Recipient not found'
      });
    }

    // Prevent sending message to self
    if (recipient === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'Cannot send message to yourself'
      });
    }

    // Generate thread ID
    const threadId = generateThreadId(req.user.id, recipient);

    const message = await Message.create({
      threadId,
      sender: req.user.id,
      recipient: recipient,
      listing: listing || null,
      content: content
    });

    const populatedMessage = await Message.findById(message._id)
      .populate('sender', 'name avatar')
      .populate('recipient', 'name avatar');

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: { message: populatedMessage }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark message as read
// @route   PUT /api/messages/:id/read
// @access  Private
export const markAsRead = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    // Check if user is the recipient
    if (message.recipient.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to mark this message as read'
      });
    }

    message.isRead = true;
    await message.save();

    res.status(200).json({
      success: true,
      message: 'Message marked as read',
      data: { message }
    });
  } catch (error) {
    next(error);
  }
};

