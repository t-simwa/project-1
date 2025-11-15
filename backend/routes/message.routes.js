import express from 'express';
import { body } from 'express-validator';
import {
  getMessageThreads,
  getMessages,
  sendMessage,
  markAsRead
} from '../controllers/message.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Validation rules
const sendMessageValidation = [
  body('recipient').notEmpty().withMessage('Recipient is required'),
  body('content').trim().notEmpty().withMessage('Message content is required').isLength({ max: 1000 }).withMessage('Message cannot exceed 1000 characters'),
  body('listing').optional()
];

// Routes
router.get('/threads', protect, getMessageThreads);
router.get('/:threadId', protect, getMessages);
router.post('/', protect, sendMessageValidation, sendMessage);
router.put('/:id/read', protect, markAsRead);

export default router;

