import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../utils/formatCurrency';
import { formatDate } from '../utils/formatDate';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';
import LazyImage from '../components/common/LazyImage';

const ListingDetail = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    requestedDate: '',
    requestedTime: '',
    message: '',
  });

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    try {
      const response = await api.get(`/listings/${id}`);
      setListing(response.data.data.listing);
      setIsFavorited(response.data.data.isFavorited || false);
    } catch (error) {
      console.error('Error fetching listing:', error);
      toast.error('Failed to load listing');
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      if (isFavorited) {
        await api.delete(`/listings/${id}/favorite`);
        setIsFavorited(false);
        toast.success('Removed from favorites');
      } else {
        await api.post(`/listings/${id}/favorite`);
        setIsFavorited(true);
        toast.success('Added to favorites');
      }
    } catch (error) {
      toast.error('Failed to update favorite');
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      await api.post('/bookings', {
        listing: id,
        ...bookingData,
      });
      toast.success('Booking request sent!');
      setShowBookingModal(false);
      setBookingData({ requestedDate: '', requestedTime: '', message: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create booking');
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<StarIcon key={i} className="h-5 w-5 text-yellow-400" />);
      } else {
        stars.push(<StarOutlineIcon key={i} className="h-5 w-5 text-gray-300" />);
      }
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Listing not found</h2>
          <Link to="/browse" className="btn btn-primary">
            Browse Listings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Images & Description */}
        <div>
          {listing.images && listing.images.length > 0 ? (
            <div className="mb-6">
              <LazyImage
                src={listing.images[0]}
                alt={listing.title}
                className="w-full h-96 object-cover rounded-lg relative"
              />
            </div>
          ) : (
            <div className="w-full h-96 bg-gray-200 rounded-lg mb-6 flex items-center justify-center">
              <span className="text-gray-400">No Image</span>
            </div>
          )}

          <div className="card">
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{listing.description}</p>
          </div>
        </div>

        {/* Right Column - Details & Booking */}
        <div>
          <div className="card sticky top-24">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-3xl font-bold">{listing.title}</h1>
              <button
                onClick={handleFavorite}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                {isFavorited ? (
                  <HeartSolidIcon className="h-6 w-6 text-red-500" />
                ) : (
                  <HeartIcon className="h-6 w-6 text-gray-400" />
                )}
              </button>
            </div>

            <div className="flex items-center mb-4">
              <span className="text-3xl font-bold text-indigo-600">
                {formatCurrency(listing.price)}
              </span>
              <span className="text-gray-600 ml-2">per session</span>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <span className="text-gray-600">Duration:</span>
                <span className="ml-2 font-medium">{listing.duration} minutes</span>
              </div>
              <div>
                <span className="text-gray-600">Category:</span>
                <span className="ml-2 font-medium">{listing.category}</span>
              </div>
              <div>
                <span className="text-gray-600">Location:</span>
                <span className="ml-2 font-medium capitalize">{listing.location?.type}</span>
              </div>
            </div>

            {/* Teacher Info */}
            <div className="border-t pt-4 mb-6">
              <Link
                to={`/profile/${listing.teacher._id}`}
                className="flex items-center space-x-4 hover:bg-gray-50 p-2 rounded-lg transition-colors"
              >
                {listing.teacher.avatar ? (
                  <img
                    src={listing.teacher.avatar}
                    alt={listing.teacher.name}
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
                    {listing.teacher.name?.charAt(0)}
                  </div>
                )}
                <div>
                  <h3 className="font-semibold">{listing.teacher.name}</h3>
                  <div className="flex items-center">
                    {renderStars(listing.teacher.rating || 0)}
                    <span className="ml-2 text-sm text-gray-600">
                      {listing.teacher.rating?.toFixed(1) || '0.0'} ({listing.teacher.totalReviews || 0} reviews)
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Booking Button */}
            {isAuthenticated && user?.id !== listing.teacher._id && (
              <button
                onClick={() => setShowBookingModal(true)}
                className="btn btn-primary w-full py-3"
              >
                Book Now
              </button>
            )}

            {!isAuthenticated && (
              <Link to="/login" className="btn btn-primary w-full py-3 text-center">
                Login to Book
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Book Session</h2>
            <form onSubmit={handleBooking} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  required
                  value={bookingData.requestedDate}
                  onChange={(e) =>
                    setBookingData({ ...bookingData, requestedDate: e.target.value })
                  }
                  min={new Date().toISOString().split('T')[0]}
                  className="input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time
                </label>
                <input
                  type="time"
                  required
                  value={bookingData.requestedTime}
                  onChange={(e) =>
                    setBookingData({ ...bookingData, requestedTime: e.target.value })
                  }
                  className="input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message (Optional)
                </label>
                <textarea
                  value={bookingData.message}
                  onChange={(e) =>
                    setBookingData({ ...bookingData, message: e.target.value })
                  }
                  className="input"
                  rows="3"
                  placeholder="Any special requests or questions..."
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="btn btn-ghost flex-1"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary flex-1">
                  Send Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingDetail;

