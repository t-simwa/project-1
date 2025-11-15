import User from '../models/User.model.js';
import Listing from '../models/Listing.model.js';
import Review from '../models/Review.model.js';
import { uploadToCloudinary } from '../utils/uploadImage.js';

// @desc    Get user profile
// @route   GET /api/users/:id
// @access  Public
export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password -emailVerificationToken -passwordResetToken');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/users/:id
// @access  Private
export const updateUserProfile = async (req, res, next) => {
  try {
    // Check if user is updating their own profile
    if (req.user.id !== req.params.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this profile'
      });
    }

    const { name, bio, location, skills, interests } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update fields
    if (name) user.name = name;
    if (bio !== undefined) user.bio = bio;
    if (location) {
      if (location.city) user.location.city = location.city;
      if (location.country) user.location.country = location.country;
      if (location.coordinates) {
        user.location.coordinates = location.coordinates;
      }
    }
    if (skills) user.skills = skills;
    if (interests) user.interests = interests;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload user avatar
// @route   POST /api/users/:id/avatar
// @access  Private
export const uploadAvatar = async (req, res, next) => {
  try {
    // Check if user is updating their own avatar
    if (req.user.id !== req.params.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this avatar'
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image file'
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Upload to Cloudinary
    const imageUrl = await uploadToCloudinary(req.file.buffer, 'localskill-exchange/avatars');

    // Delete old avatar if exists
    if (user.avatar) {
      // Delete old image from Cloudinary (optional)
    }

    // Update user avatar
    user.avatar = imageUrl;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Avatar uploaded successfully',
      data: { avatar: imageUrl }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's listings
// @route   GET /api/users/:id/listings
// @access  Public
export const getUserListings = async (req, res, next) => {
  try {
    const listings = await Listing.find({ teacher: req.params.id, status: 'active' })
      .populate('teacher', 'name avatar rating')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: listings.length,
      data: { listings }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's reviews
// @route   GET /api/users/:id/reviews
// @access  Public
export const getUserReviews = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const reviews = await Review.find({ reviewee: req.params.id })
      .populate('reviewer', 'name avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Review.countDocuments({ reviewee: req.params.id });

    res.status(200).json({
      success: true,
      count: reviews.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: { reviews }
    });
  } catch (error) {
    next(error);
  }
};

