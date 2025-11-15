import express from 'express';
import { body } from 'express-validator';
import {
  getReviews,
  createReview,
  updateReview,
  deleteReview
} from '../controllers/review.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// Validation rules
const createReviewValidation = [
  body('reviewee').notEmpty().withMessage('Reviewee is required'),
  body('booking').notEmpty().withMessage('Booking is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').trim().notEmpty().withMessage('Comment is required').isLength({ min: 10, max: 500 }).withMessage('Comment must be between 10 and 500 characters')
];

const updateReviewValidation = [
  body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').optional().trim().isLength({ min: 10, max: 500 }).withMessage('Comment must be between 10 and 500 characters')
];

// Routes
router.get('/user/:userId', getReviews);
router.post('/', protect, createReviewValidation, createReview);
router.put('/:id', protect, updateReviewValidation, updateReview);
router.delete('/:id', protect, deleteReview);

export default router;

