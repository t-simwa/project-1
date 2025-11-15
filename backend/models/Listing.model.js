import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Teacher is required']
  },
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: ['Cooking', 'Tech', 'Languages', 'Arts', 'Fitness', 'Business', 'Other']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: [0, 'Price cannot be negative']
  },
  duration: {
    type: Number,
    required: [true, 'Please provide duration in minutes'],
    min: [15, 'Duration must be at least 15 minutes']
  },
  location: {
    type: {
      type: String,
      enum: ['in-person', 'online', 'both'],
      required: true
    },
    address: {
      type: String,
      default: ''
    },
    city: {
      type: String,
      default: ''
    }
  },
  images: {
    type: [String],
    default: [],
    validate: {
      validator: function(v) {
        return v.length <= 3;
      },
      message: 'Cannot upload more than 3 images'
    }
  },
  availability: {
    days: {
      type: [String],
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      default: []
    },
    timeSlots: {
      type: [String],
      default: []
    }
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'draft'],
    default: 'active'
  },
  views: {
    type: Number,
    default: 0
  },
  favoritesCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes for better query performance
listingSchema.index({ teacher: 1 });
listingSchema.index({ category: 1 });
listingSchema.index({ status: 1 });
listingSchema.index({ 'location.city': 1 });
listingSchema.index({ createdAt: -1 });
listingSchema.index({ title: 'text', description: 'text' }); // Text search

// Increment views
listingSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;

