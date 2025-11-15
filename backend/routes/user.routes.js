import express from 'express';
import { body } from 'express-validator';
import {
  getUserProfile,
  updateUserProfile,
  uploadAvatar,
  getUserListings,
  getUserReviews
} from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { upload } from '../utils/uploadImage.js';

const router = express.Router();

// Validation rules
const updateProfileValidation = [
  body('name').optional().trim().isLength({ max: 50 }).withMessage('Name cannot exceed 50 characters'),
  body('bio').optional().trim().isLength({ max: 500 }).withMessage('Bio cannot exceed 500 characters'),
  body('location.city').optional().trim(),
  body('location.country').optional().trim(),
  body('skills').optional().isArray(),
  body('interests').optional().isArray()
];

// Routes
router.get('/:id', getUserProfile);
router.put('/:id', protect, updateProfileValidation, updateUserProfile);
router.post('/:id/avatar', protect, upload.single('avatar'), uploadAvatar);
router.get('/:id/listings', getUserListings);
router.get('/:id/reviews', getUserReviews);

export default router;

