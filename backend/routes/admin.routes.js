import express from 'express';
import {
  getStats,
  getUsers,
  getListings,
  flagListing,
  suspendUser
} from '../controllers/admin.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// All admin routes require authentication and admin role
router.use(protect);
router.use(authorize('admin'));

// Routes
router.get('/stats', getStats);
router.get('/users', getUsers);
router.get('/listings', getListings);
router.put('/listings/:id/flag', flagListing);
router.put('/users/:id/suspend', suspendUser);

export default router;

