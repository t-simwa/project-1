import Review from '../models/Review.model.js';
import Booking from '../models/Booking.model.js';

// @desc    Get reviews for a user
// @route   GET /api/reviews/user/:userId
// @access  Public
export const getReviews = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const reviews = await Review.find({ reviewee: req.params.userId })
      .populate('reviewer', 'name avatar')
      .populate('booking', 'listing')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Review.countDocuments({ reviewee: req.params.userId });

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

// @desc    Create review
// @route   POST /api/reviews
// @access  Private (Learner only)
export const createReview = async (req, res, next) => {
  try {
    const { reviewee, booking, rating, comment } = req.body;

    // Check if booking exists and is completed
    const bookingDoc = await Booking.findById(booking);
    if (!bookingDoc) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (bookingDoc.status !== 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Can only review completed bookings'
      });
    }

    // Check if user is the learner who made the booking
    if (bookingDoc.learner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Only the learner can leave a review for this booking'
      });
    }

    // Check if reviewee matches the teacher
    if (bookingDoc.teacher.toString() !== reviewee) {
      return res.status(400).json({
        success: false,
        message: 'Reviewee does not match the teacher in the booking'
      });
    }

    // Check if review already exists for this booking
    const existingReview = await Review.findOne({ booking: booking });
    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'Review already exists for this booking'
      });
    }

    const review = await Review.create({
      reviewer: req.user.id,
      reviewee: reviewee,
      booking: booking,
      rating: rating,
      comment: comment
    });

    const populatedReview = await Review.findById(review._id)
      .populate('reviewer', 'name avatar')
      .populate('booking', 'listing');

    res.status(201).json({
      success: true,
      message: 'Review created successfully',
      data: { review: populatedReview }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private (Author only)
export const updateReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    // Check if user is the author
    if (review.reviewer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this review'
      });
    }

    const { rating, comment, response } = req.body;

    if (rating) review.rating = rating;
    if (comment) review.comment = comment;
    if (response !== undefined) review.response = response;

    await review.save();

    const populatedReview = await Review.findById(review._id)
      .populate('reviewer', 'name avatar')
      .populate('booking', 'listing');

    res.status(200).json({
      success: true,
      message: 'Review updated successfully',
      data: { review: populatedReview }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private (Author or Admin only)
export const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    // Check if user is the author or admin
    if (review.reviewer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this review'
      });
    }

    await review.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

