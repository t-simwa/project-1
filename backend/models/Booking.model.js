import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  learner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Learner is required']
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Teacher is required']
  },
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing',
    required: [true, 'Listing is required']
  },
  requestedDate: {
    type: Date,
    required: [true, 'Please provide a requested date']
  },
  requestedTime: {
    type: String,
    required: [true, 'Please provide a requested time']
  },
  message: {
    type: String,
    maxlength: [500, 'Message cannot exceed 500 characters'],
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Indexes
bookingSchema.index({ learner: 1 });
bookingSchema.index({ teacher: 1 });
bookingSchema.index({ listing: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ requestedDate: 1 });

// Prevent duplicate bookings (same learner, listing, and date)
bookingSchema.index({ learner: 1, listing: 1, requestedDate: 1 }, { unique: false });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;

