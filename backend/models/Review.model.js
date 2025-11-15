import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Reviewer is required']
  },
  reviewee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Reviewee is required']
  },
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: [true, 'Booking is required']
  },
  rating: {
    type: Number,
    required: [true, 'Please provide a rating'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5']
  },
  comment: {
    type: String,
    required: [true, 'Please provide a comment'],
    minlength: [10, 'Comment must be at least 10 characters'],
    maxlength: [500, 'Comment cannot exceed 500 characters']
  },
  response: {
    type: String,
    maxlength: [500, 'Response cannot exceed 500 characters'],
    default: ''
  }
}, {
  timestamps: true
});

// Indexes
reviewSchema.index({ reviewee: 1 });
reviewSchema.index({ reviewer: 1 });
reviewSchema.index({ booking: 1 }, { unique: true }); // One review per booking

// Update teacher rating when review is saved
reviewSchema.post('save', async function() {
  const User = mongoose.model('User');
  const teacher = await User.findById(this.reviewee);
  if (teacher) {
    await teacher.updateRating();
  }
});

// Update teacher rating when review is deleted
reviewSchema.post('findOneAndDelete', async function(doc) {
  if (doc) {
    const User = mongoose.model('User');
    const teacher = await User.findById(doc.reviewee);
    if (teacher) {
      await teacher.updateRating();
    }
  }
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;

