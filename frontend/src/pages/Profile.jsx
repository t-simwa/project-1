import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';
import ReviewResponseForm from '../components/reviews/ReviewResponseForm';

const Profile = () => {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [listings, setListings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [respondingToReview, setRespondingToReview] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const [userRes, listingsRes, reviewsRes] = await Promise.all([
        api.get(`/users/${id}`),
        api.get(`/users/${id}/listings`),
        api.get(`/reviews/user/${id}`),
      ]);
      setUser(userRes.data.data.user);
      setListings(listingsRes.data.data.listings);
      setReviews(reviewsRes.data.data.reviews);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
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

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">User not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="card mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-full"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center text-white text-3xl font-bold">
              {user.name?.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
            {user.bio && <p className="text-gray-700 mb-4">{user.bio}</p>}
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {renderStars(user.rating || 0)}
                <span className="ml-2 font-semibold">
                  {user.rating?.toFixed(1) || '0.0'}
                </span>
                <span className="ml-1 text-gray-600">
                  ({user.totalReviews || 0} reviews)
                </span>
              </div>
            </div>
            {user.location?.city && (
              <p className="text-gray-600 mt-2">
                📍 {user.location.city}
                {user.location.country && `, ${user.location.country}`}
              </p>
            )}
          </div>
        </div>
      </div>

      {user.role === 'teacher' && listings.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Listings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <a
                key={listing._id}
                href={`/listings/${listing._id}`}
                className="card hover:shadow-lg transition-shadow"
              >
                {listing.images && listing.images.length > 0 && (
                  <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <h3 className="font-semibold mb-2">{listing.title}</h3>
              </a>
            ))}
          </div>
        </div>
      )}

      {reviews.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Reviews</h2>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review._id} className="card">
                <div className="flex items-start space-x-4">
                  {review.reviewer.avatar ? (
                    <img
                      src={review.reviewer.avatar}
                      alt={review.reviewer.name}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                      {review.reviewer.name?.charAt(0)}
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{review.reviewer.name}</h3>
                      <div className="flex items-center">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                    {review.response && (
                      <div className="mt-4 pl-4 border-l-2 border-gray-200">
                        <p className="text-sm text-gray-600 font-semibold mb-1">Response:</p>
                        <p className="text-gray-700">{review.response}</p>
                      </div>
                    )}
                    {!review.response && currentUser?.id === user?._id && currentUser?.role === 'teacher' && (
                      <div className="mt-2">
                        {respondingToReview === review._id ? (
                          <ReviewResponseForm
                            review={review}
                            onSuccess={() => {
                              setRespondingToReview(null);
                              fetchProfile();
                            }}
                            onCancel={() => setRespondingToReview(null)}
                          />
                        ) : (
                          <button
                            onClick={() => setRespondingToReview(review._id)}
                            className="text-sm text-indigo-600 hover:text-indigo-800"
                          >
                            Respond to review
                          </button>
                        )}
                      </div>
                    )}
                    <p className="text-sm text-gray-500 mt-2">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

