import Booking from '../models/Booking.model.js';
import Listing from '../models/Listing.model.js';
import User from '../models/User.model.js';
import sendEmail from '../utils/sendEmail.js';

// @desc    Get user's bookings
// @route   GET /api/bookings
// @access  Private
export const getBookings = async (req, res, next) => {
  try {
    const { role } = req.user;
    const { status } = req.query;

    let query = {};
    
    // Teachers see bookings they received, learners see bookings they made
    if (role === 'teacher') {
      query.teacher = req.user.id;
    } else {
      query.learner = req.user.id;
    }

    if (status) {
      query.status = status;
    }

    const bookings = await Booking.find(query)
      .populate('learner', 'name avatar email')
      .populate('teacher', 'name avatar email')
      .populate('listing', 'title price duration images')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: { bookings }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
export const getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('learner', 'name avatar email')
      .populate('teacher', 'name avatar email')
      .populate('listing', 'title price duration images category');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user is authorized to view this booking
    if (
      booking.learner._id.toString() !== req.user.id &&
      booking.teacher._id.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this booking'
      });
    }

    res.status(200).json({
      success: true,
      data: { booking }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create booking
// @route   POST /api/bookings
// @access  Private (Learner only)
export const createBooking = async (req, res, next) => {
  try {
    // Only learners can create bookings
    if (req.user.role === 'teacher' && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only learners can create bookings'
      });
    }

    const { listing, requestedDate, requestedTime, message } = req.body;

    // Check if listing exists
    const listingDoc = await Listing.findById(listing);
    if (!listingDoc) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found'
      });
    }

    // Check if listing is active
    if (listingDoc.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'Listing is not available for booking'
      });
    }

    // Check if user is trying to book their own listing
    if (listingDoc.teacher.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'You cannot book your own listing'
      });
    }

    // Check for duplicate booking (same learner, listing, and date)
    const existingBooking = await Booking.findOne({
      learner: req.user.id,
      listing: listing,
      requestedDate: new Date(requestedDate),
      status: { $in: ['pending', 'confirmed'] }
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: 'You already have a booking for this listing on this date'
      });
    }

    // Get teacher info
    const teacher = await User.findById(listingDoc.teacher);

    // Create booking
    const booking = await Booking.create({
      learner: req.user.id,
      teacher: listingDoc.teacher,
      listing: listing,
      requestedDate: new Date(requestedDate),
      requestedTime: requestedTime,
      message: message || ''
    });

    const populatedBooking = await Booking.findById(booking._id)
      .populate('learner', 'name avatar email')
      .populate('teacher', 'name avatar email')
      .populate('listing', 'title price duration');

    // Send email notification to teacher
    try {
      await sendEmail({
        email: teacher.email,
        subject: 'New Booking Request - LocalSkill Exchange',
        html: `
          <h2>New Booking Request</h2>
          <p>You have received a new booking request for "${listingDoc.title}".</p>
          <p><strong>Learner:</strong> ${req.user.name}</p>
          <p><strong>Date:</strong> ${new Date(requestedDate).toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${requestedTime}</p>
          ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
          <p>Please log in to confirm or decline this booking.</p>
        `
      });
    } catch (error) {
      console.error('Error sending email:', error);
    }

    res.status(201).json({
      success: true,
      message: 'Booking request created successfully',
      data: { booking: populatedBooking }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Confirm booking
// @route   PUT /api/bookings/:id/confirm
// @access  Private (Teacher only)
export const confirmBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('learner', 'name email')
      .populate('teacher', 'name email')
      .populate('listing', 'title');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user is the teacher
    if (booking.teacher._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only the teacher can confirm this booking'
      });
    }

    // Check if booking is in pending status
    if (booking.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: `Booking is already ${booking.status}`
      });
    }

    booking.status = 'confirmed';
    await booking.save();

    // Send email notification to learner
    try {
      await sendEmail({
        email: booking.learner.email,
        subject: 'Booking Confirmed - LocalSkill Exchange',
        html: `
          <h2>Booking Confirmed!</h2>
          <p>Your booking request for "${booking.listing.title}" has been confirmed by ${booking.teacher.name}.</p>
          <p><strong>Date:</strong> ${new Date(booking.requestedDate).toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${booking.requestedTime}</p>
          <p>We look forward to your session!</p>
        `
      });
    } catch (error) {
      console.error('Error sending email:', error);
    }

    res.status(200).json({
      success: true,
      message: 'Booking confirmed successfully',
      data: { booking }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
export const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('learner', 'name email')
      .populate('teacher', 'name email')
      .populate('listing', 'title');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user is authorized (learner or teacher)
    if (
      booking.learner._id.toString() !== req.user.id &&
      booking.teacher._id.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this booking'
      });
    }

    // Check if booking can be cancelled
    if (booking.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Booking is already cancelled'
      });
    }

    if (booking.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel a completed booking'
      });
    }

    booking.status = 'cancelled';
    await booking.save();

    // Send email notification
    const recipientEmail = booking.learner._id.toString() === req.user.id 
      ? booking.teacher.email 
      : booking.learner.email;
    const recipientName = booking.learner._id.toString() === req.user.id 
      ? booking.teacher.name 
      : booking.learner.name;

    try {
      await sendEmail({
        email: recipientEmail,
        subject: 'Booking Cancelled - LocalSkill Exchange',
        html: `
          <h2>Booking Cancelled</h2>
          <p>The booking for "${booking.listing.title}" has been cancelled.</p>
          <p><strong>Date:</strong> ${new Date(booking.requestedDate).toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${booking.requestedTime}</p>
        `
      });
    } catch (error) {
      console.error('Error sending email:', error);
    }

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      data: { booking }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Complete booking
// @route   PUT /api/bookings/:id/complete
// @access  Private (Teacher only)
export const completeBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('learner', 'name email')
      .populate('teacher', 'name email')
      .populate('listing', 'title');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user is the teacher
    if (booking.teacher._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only the teacher can mark this booking as completed'
      });
    }

    // Check if booking is confirmed
    if (booking.status !== 'confirmed') {
      return res.status(400).json({
        success: false,
        message: 'Only confirmed bookings can be marked as completed'
      });
    }

    booking.status = 'completed';
    await booking.save();

    // Send email notification to learner
    try {
      await sendEmail({
        email: booking.learner.email,
        subject: 'Session Completed - LocalSkill Exchange',
        html: `
          <h2>Session Completed</h2>
          <p>Your session for "${booking.listing.title}" has been marked as completed.</p>
          <p>Please consider leaving a review to help other learners!</p>
        `
      });
    } catch (error) {
      console.error('Error sending email:', error);
    }

    res.status(200).json({
      success: true,
      message: 'Booking marked as completed',
      data: { booking }
    });
  } catch (error) {
    next(error);
  }
};

