import express from 'express';
import { body } from 'express-validator';
import {
  getBookings,
  getBooking,
  createBooking,
  confirmBooking,
  cancelBooking,
  completeBooking
} from '../controllers/booking.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Validation rules
const createBookingValidation = [
  body('listing').notEmpty().withMessage('Listing is required'),
  body('requestedDate').notEmpty().withMessage('Requested date is required'),
  body('requestedTime').notEmpty().withMessage('Requested time is required'),
  body('message').optional().isLength({ max: 500 }).withMessage('Message cannot exceed 500 characters')
];

// Routes
router.get('/', protect, getBookings);
router.get('/:id', protect, getBooking);
router.post('/', protect, createBookingValidation, createBooking);
router.put('/:id/confirm', protect, confirmBooking);
router.put('/:id/cancel', protect, cancelBooking);
router.put('/:id/complete', protect, completeBooking);

export default router;

