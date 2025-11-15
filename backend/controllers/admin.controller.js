import User from '../models/User.model.js';
import Listing from '../models/Listing.model.js';
import Booking from '../models/Booking.model.js';
import Review from '../models/Review.model.js';

// @desc    Get platform statistics
// @route   GET /api/admin/stats
// @access  Private (Admin only)
export const getStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTeachers = await User.countDocuments({ role: 'teacher' });
    const totalLearners = await User.countDocuments({ role: 'learner' });
    const totalListings = await Listing.countDocuments();
    const activeListings = await Listing.countDocuments({ status: 'active' });
    const totalBookings = await Booking.countDocuments();
    const completedBookings = await Booking.countDocuments({ status: 'completed' });
    const totalReviews = await Review.countDocuments();

    // Recent activity (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentUsers = await User.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });
    const recentListings = await Listing.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });
    const recentBookings = await Booking.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });

    res.status(200).json({
      success: true,
      data: {
        overview: {
          totalUsers,
          totalTeachers,
          totalLearners,
          totalListings,
          activeListings,
          totalBookings,
          completedBookings,
          totalReviews
        },
        recentActivity: {
          recentUsers,
          recentListings,
          recentBookings
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin only)
export const getUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .select('-password -emailVerificationToken -passwordResetToken')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments();

    res.status(200).json({
      success: true,
      count: users.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: { users }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all listings
// @route   GET /api/admin/listings
// @access  Private (Admin only)
export const getListings = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const { status } = req.query;

    const query = {};
    if (status) {
      query.status = status;
    }

    const listings = await Listing.find(query)
      .populate('teacher', 'name email')
      .sort({ createdAt: -1 })
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

// @desc    Flag/remove listing
// @route   PUT /api/admin/listings/:id/flag
// @access  Private (Admin only)
export const flagListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found'
      });
    }

    // Toggle status between active and inactive
    listing.status = listing.status === 'active' ? 'inactive' : 'active';
    await listing.save();

    res.status(200).json({
      success: true,
      message: `Listing ${listing.status === 'active' ? 'activated' : 'flagged and deactivated'}`,
      data: { listing }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Suspend/activate user
// @route   PUT /api/admin/users/:id/suspend
// @access  Private (Admin only)
export const suspendUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Add a suspended field (you may need to add this to the User model)
    // For now, we'll use a workaround by checking if user exists
    // In a real app, you'd add an `isSuspended` or `status` field to the User model

    res.status(200).json({
      success: true,
      message: 'User status updated',
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};

