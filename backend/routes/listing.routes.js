import express from 'express';
import { body } from 'express-validator';
import {
  getListings,
  getListing,
  createListing,
  updateListing,
  deleteListing,
  addFavorite,
  removeFavorite,
  getFavorites
} from '../controllers/listing.controller.js';
import { protect, optionalAuth } from '../middleware/auth.middleware.js';
import { upload } from '../utils/uploadImage.js';

const router = express.Router();

// Validation rules
const createListingValidation = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 100 }).withMessage('Title cannot exceed 100 characters'),
  body('description').trim().notEmpty().withMessage('Description is required').isLength({ max: 2000 }).withMessage('Description cannot exceed 2000 characters'),
  body('category').isIn(['Cooking', 'Tech', 'Languages', 'Arts', 'Fitness', 'Business', 'Other']).withMessage('Invalid category'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('duration').isInt({ min: 15 }).withMessage('Duration must be at least 15 minutes'),
  body('location.type').isIn(['in-person', 'online', 'both']).withMessage('Invalid location type')
];

// Routes
router.get('/', optionalAuth, getListings);
router.get('/favorites', protect, getFavorites);
router.get('/:id', optionalAuth, getListing);
router.post('/', protect, upload.array('images', 3), createListingValidation, createListing);
router.put('/:id', protect, upload.array('images', 3), createListingValidation, updateListing);
router.delete('/:id', protect, deleteListing);
router.post('/:id/favorite', protect, addFavorite);
router.delete('/:id/favorite', protect, removeFavorite);

export default router;

