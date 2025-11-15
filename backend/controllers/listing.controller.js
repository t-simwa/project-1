import Listing from '../models/Listing.model.js';
import Favorite from '../models/Favorite.model.js';
import { uploadToCloudinary, deleteImage } from '../utils/uploadImage.js';

// @desc    Get all listings with search, filter, and pagination
// @route   GET /api/listings
// @access  Public
export const getListings = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build query
    const query = { status: 'active' };

    // Search
    if (req.query.search) {
      query.$text = { $search: req.query.search };
    }

    // Category filter
    if (req.query.category) {
      query.category = req.query.category;
    }

    // Price range filter
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) query.price.$gte = parseFloat(req.query.minPrice);
      if (req.query.maxPrice) query.price.$lte = parseFloat(req.query.maxPrice);
    }

    // Location filter
    if (req.query.locationType) {
      query['location.type'] = req.query.locationType;
    }

    if (req.query.city) {
      query['location.city'] = new RegExp(req.query.city, 'i');
    }

    // Sort
    let sort = { createdAt: -1 };
    if (req.query.sort) {
      switch (req.query.sort) {
        case 'price-low':
          sort = { price: 1 };
          break;
        case 'price-high':
          sort = { price: -1 };
          break;
        case 'rating':
          sort = { 'teacher.rating': -1 };
          break;
        case 'newest':
          sort = { createdAt: -1 };
          break;
        default:
          sort = { createdAt: -1 };
      }
    }

    // Execute query
    const listings = await Listing.find(query)
      .populate('teacher', 'name avatar rating totalReviews')
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Listing.countDocuments(query);

    res.status(200).json({
      success: true,
      count: listings.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: { listings }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single listing
// @route   GET /api/listings/:id
// @access  Public
export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id)
      .populate('teacher', 'name avatar bio rating totalReviews skills location');

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found'
      });
    }

    // Increment views (if user is authenticated and not the owner)
    if (req.user && listing.teacher._id.toString() !== req.user.id) {
      await listing.incrementViews();
    } else if (!req.user) {
      await listing.incrementViews();
    }

    // Check if user has favorited this listing
    let isFavorited = false;
    if (req.user) {
      const favorite = await Favorite.findOne({
        user: req.user.id,
        listing: listing._id
      });
      isFavorited = !!favorite;
    }

    res.status(200).json({
      success: true,
      data: { listing, isFavorited }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create listing
// @route   POST /api/listings
// @access  Private (Teacher only)
export const createListing = async (req, res, next) => {
  try {
    // Check if user is a teacher
    if (req.user.role !== 'teacher' && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only teachers can create listings'
      });
    }

    const {
      title,
      description,
      category,
      price,
      duration,
      location,
      availability,
      status
    } = req.body;

    // Handle image uploads if provided
    let images = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const imageUrl = await uploadToCloudinary(file.buffer, 'localskill-exchange/listings');
        images.push(imageUrl);
        if (images.length >= 3) break; // Max 3 images
      }
    }

    const listing = await Listing.create({
      teacher: req.user.id,
      title,
      description,
      category,
      price,
      duration,
      location,
      availability: availability || { days: [], timeSlots: [] },
      images,
      status: status || 'active'
    });

    const populatedListing = await Listing.findById(listing._id)
      .populate('teacher', 'name avatar rating');

    res.status(201).json({
      success: true,
      message: 'Listing created successfully',
      data: { listing: populatedListing }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update listing
// @route   PUT /api/listings/:id
// @access  Private (Owner only)
export const updateListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found'
      });
    }

    // Check if user is the owner or admin
    if (listing.teacher.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this listing'
      });
    }

    const {
      title,
      description,
      category,
      price,
      duration,
      location,
      availability,
      status
    } = req.body;

    // Update fields
    if (title) listing.title = title;
    if (description) listing.description = description;
    if (category) listing.category = category;
    if (price) listing.price = price;
    if (duration) listing.duration = duration;
    if (location) listing.location = { ...listing.location, ...location };
    if (availability) listing.availability = availability;
    if (status) listing.status = status;

    // Handle new image uploads
    if (req.files && req.files.length > 0) {
      const newImages = [];
      for (const file of req.files) {
        const imageUrl = await uploadToCloudinary(file.buffer, 'localskill-exchange/listings');
        newImages.push(imageUrl);
      }
      listing.images = [...listing.images, ...newImages].slice(0, 3); // Max 3 images
    }

    await listing.save();

    const populatedListing = await Listing.findById(listing._id)
      .populate('teacher', 'name avatar rating');

    res.status(200).json({
      success: true,
      message: 'Listing updated successfully',
      data: { listing: populatedListing }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete listing
// @route   DELETE /api/listings/:id
// @access  Private (Owner or Admin only)
export const deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found'
      });
    }

    // Check if user is the owner or admin
    if (listing.teacher.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this listing'
      });
    }

    // Delete images from Cloudinary
    for (const imageUrl of listing.images) {
      await deleteImage(imageUrl);
    }

    await listing.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Listing deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add listing to favorites
// @route   POST /api/listings/:id/favorite
// @access  Private
export const addFavorite = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found'
      });
    }

    // Check if already favorited
    const existingFavorite = await Favorite.findOne({
      user: req.user.id,
      listing: req.params.id
    });

    if (existingFavorite) {
      return res.status(400).json({
        success: false,
        message: 'Listing already in favorites'
      });
    }

    await Favorite.create({
      user: req.user.id,
      listing: req.params.id
    });

    res.status(200).json({
      success: true,
      message: 'Listing added to favorites'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove listing from favorites
// @route   DELETE /api/listings/:id/favorite
// @access  Private
export const removeFavorite = async (req, res, next) => {
  try {
    const favorite = await Favorite.findOneAndDelete({
      user: req.user.id,
      listing: req.params.id
    });

    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: 'Favorite not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Listing removed from favorites'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's favorites
// @route   GET /api/listings/favorites
// @access  Private
export const getFavorites = async (req, res, next) => {
  try {
    const favorites = await Favorite.find({ user: req.user.id })
      .populate({
        path: 'listing',
        populate: {
          path: 'teacher',
          select: 'name avatar rating'
        }
      })
      .sort({ createdAt: -1 });

    const listings = favorites.map(fav => fav.listing).filter(listing => listing !== null);

    res.status(200).json({
      success: true,
      count: listings.length,
      data: { listings }
    });
  } catch (error) {
    next(error);
  }
};

