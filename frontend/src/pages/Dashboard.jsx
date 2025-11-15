import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { formatCurrency } from '../utils/formatCurrency';
import { formatDate } from '../utils/formatDate';
import ReviewForm from '../components/reviews/ReviewForm';
import BookingCalendar from '../components/bookings/BookingCalendar';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [listings, setListings] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBookingForReview, setSelectedBookingForReview] = useState(null);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'listings' || (activeTab === 'overview' && user?.role === 'teacher')) {
        const listingsRes = await api.get(`/users/${user.id}/listings`);
        setListings(listingsRes.data.data.listings);
      }
      if (activeTab === 'bookings' || activeTab === 'overview') {
        const bookingsRes = await api.get('/bookings');
        setBookings(bookingsRes.data.data.bookings);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const isTeacher = user?.role === 'teacher';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Overview
          </button>
          {isTeacher && (
            <button
              onClick={() => setActiveTab('listings')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'listings'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              My Listings
            </button>
          )}
          <button
            onClick={() => setActiveTab('bookings')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'bookings'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {isTeacher ? 'Bookings Received' : 'My Bookings'}
          </button>
        </nav>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        </div>
      ) : (
        <>
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {isTeacher && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="card">
                    <h3 className="text-gray-600 mb-2">Total Listings</h3>
                    <p className="text-3xl font-bold">{listings.length}</p>
                  </div>
                  <div className="card">
                    <h3 className="text-gray-600 mb-2">Pending Bookings</h3>
                    <p className="text-3xl font-bold">
                      {bookings.filter((b) => b.status === 'pending').length}
                    </p>
                  </div>
                  <div className="card">
                    <h3 className="text-gray-600 mb-2">Completed Sessions</h3>
                    <p className="text-3xl font-bold">
                      {bookings.filter((b) => b.status === 'completed').length}
                    </p>
                  </div>
                </div>
              )}

              <div className="card">
                <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
                {bookings.length === 0 ? (
                  <p className="text-gray-500">No bookings yet</p>
                ) : (
                  <div className="space-y-4">
                    {bookings.slice(0, 5).map((booking) => (
                      <div
                        key={booking._id}
                        className="border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <Link
                              to={`/listings/${booking.listing._id}`}
                              className="font-semibold hover:text-indigo-600"
                            >
                              {booking.listing.title}
                            </Link>
                            <p className="text-sm text-gray-600">
                              {formatDate(booking.requestedDate)} at {booking.requestedTime}
                            </p>
                            <span
                              className={`inline-block mt-2 px-2 py-1 text-xs rounded ${
                                booking.status === 'confirmed'
                                  ? 'bg-green-100 text-green-800'
                                  : booking.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : booking.status === 'completed'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {booking.status}
                            </span>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">
                              {formatCurrency(booking.listing.price)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'listings' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">My Listings</h2>
                <Link to="/create-listing" className="btn btn-primary">
                  Create New Listing
                </Link>
              </div>
              {listings.length === 0 ? (
                <div className="card text-center py-12">
                  <p className="text-gray-500 mb-4">You haven't created any listings yet</p>
                  <Link to="/create-listing" className="btn btn-primary">
                    Create Your First Listing
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {listings.map((listing) => (
                    <Link
                      key={listing._id}
                      to={`/listings/${listing._id}`}
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
                      <p className="text-indigo-600 font-bold">
                        {formatCurrency(listing.price)}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'bookings' && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">
                {isTeacher ? 'Bookings Received' : 'My Bookings'}
              </h2>
              {isTeacher && bookings.length > 0 && (
                <div className="mb-8">
                  <BookingCalendar bookings={bookings} />
                </div>
              )}
              {bookings.length === 0 ? (
                <div className="card text-center py-12">
                  <p className="text-gray-500">No bookings yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking._id} className="card">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <Link
                            to={`/listings/${booking.listing._id}`}
                            className="text-lg font-semibold hover:text-indigo-600"
                          >
                            {booking.listing.title}
                          </Link>
                          <p className="text-gray-600 mt-1">
                            {formatDate(booking.requestedDate)} at {booking.requestedTime}
                          </p>
                          {booking.message && (
                            <p className="text-gray-700 mt-2">{booking.message}</p>
                          )}
                          <span
                            className={`inline-block mt-2 px-3 py-1 text-sm rounded ${
                              booking.status === 'confirmed'
                                ? 'bg-green-100 text-green-800'
                                : booking.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : booking.status === 'completed'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {booking.status}
                          </span>
                          {!isTeacher && booking.status === 'completed' && (
                            <div className="mt-3">
                              <button
                                onClick={() => setSelectedBookingForReview(booking)}
                                className="btn btn-primary text-sm"
                              >
                                Leave Review
                              </button>
                            </div>
                          )}
                          {isTeacher && booking.status === 'pending' && (
                            <div className="mt-3 flex gap-2">
                              <button
                                onClick={async () => {
                                  try {
                                    await api.put(`/bookings/${booking._id}/confirm`);
                                    toast.success('Booking confirmed!');
                                    fetchData();
                                  } catch (error) {
                                    toast.error('Failed to confirm booking');
                                  }
                                }}
                                className="btn btn-secondary text-sm"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={async () => {
                                  try {
                                    await api.put(`/bookings/${booking._id}/cancel`);
                                    toast.success('Booking cancelled');
                                    fetchData();
                                  } catch (error) {
                                    toast.error('Failed to cancel booking');
                                  }
                                }}
                                className="btn btn-ghost text-sm"
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                          {isTeacher && booking.status === 'confirmed' && (
                            <div className="mt-3">
                              <button
                                onClick={async () => {
                                  try {
                                    await api.put(`/bookings/${booking._id}/complete`);
                                    toast.success('Booking marked as completed!');
                                    fetchData();
                                  } catch (error) {
                                    toast.error('Failed to complete booking');
                                  }
                                }}
                                className="btn btn-secondary text-sm"
                              >
                                Mark as Completed
                              </button>
                            </div>
                          )}
                        </div>
                        <div className="text-right ml-4">
                          <p className="text-lg font-bold text-indigo-600">
                            {formatCurrency(booking.listing.price)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}

      {selectedBookingForReview && (
        <ReviewForm
          booking={selectedBookingForReview}
          onSuccess={() => {
            setSelectedBookingForReview(null);
            fetchData();
          }}
          onCancel={() => setSelectedBookingForReview(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;

