import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing',
    required: [true, 'Listing is required']
  }
}, {
  timestamps: true
});

// Prevent duplicate favorites
favoriteSchema.index({ user: 1, listing: 1 }, { unique: true });

// Update favoritesCount on listing when favorite is added/removed
favoriteSchema.post('save', async function() {
  const Listing = mongoose.model('Listing');
  await Listing.findByIdAndUpdate(this.listing, {
    $inc: { favoritesCount: 1 }
  });
});

favoriteSchema.post('findOneAndDelete', async function(doc) {
  if (doc) {
    const Listing = mongoose.model('Listing');
    await Listing.findByIdAndUpdate(doc.listing, {
      $inc: { favoritesCount: -1 }
    });
  }
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

export default Favorite;

