import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { formatDate } from '../utils/formatDate';
import toast from 'react-hot-toast';

const AdminPanel = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);
  const [activeTab, setActiveTab] = useState('stats');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role !== 'admin') {
      return;
    }
    fetchData();
  }, [activeTab, user]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'stats') {
        const statsRes = await api.get('/admin/stats');
        setStats(statsRes.data.data);
      } else if (activeTab === 'users') {
        const usersRes = await api.get('/admin/users');
        setUsers(usersRes.data.data.users);
      } else if (activeTab === 'listings') {
        const listingsRes = await api.get('/admin/listings');
        setListings(listingsRes.data.data.listings);
      }
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleFlagListing = async (listingId) => {
    try {
      await api.put(`/admin/listings/${listingId}/flag`);
      toast.success('Listing status updated');
      fetchData();
    } catch (error) {
      toast.error('Failed to update listing');
    }
  };

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="text-gray-600">You must be an admin to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('stats')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'stats'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Statistics
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'users'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab('listings')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'listings'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Listings
          </button>
        </nav>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        </div>
      ) : (
        <>
          {activeTab === 'stats' && stats && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Platform Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="card">
                  <h3 className="text-gray-600 mb-2">Total Users</h3>
                  <p className="text-3xl font-bold">{stats.overview.totalUsers}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {stats.overview.totalTeachers} teachers, {stats.overview.totalLearners} learners
                  </p>
                </div>
                <div className="card">
                  <h3 className="text-gray-600 mb-2">Total Listings</h3>
                  <p className="text-3xl font-bold">{stats.overview.totalListings}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {stats.overview.activeListings} active
                  </p>
                </div>
                <div className="card">
                  <h3 className="text-gray-600 mb-2">Total Bookings</h3>
                  <p className="text-3xl font-bold">{stats.overview.totalBookings}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {stats.overview.completedBookings} completed
                  </p>
                </div>
                <div className="card">
                  <h3 className="text-gray-600 mb-2">Total Reviews</h3>
                  <p className="text-3xl font-bold">{stats.overview.totalReviews}</p>
                </div>
              </div>

              <div className="card">
                <h3 className="text-xl font-semibold mb-4">Recent Activity (Last 30 Days)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-gray-600">New Users</p>
                    <p className="text-2xl font-bold">{stats.recentActivity.recentUsers}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">New Listings</p>
                    <p className="text-2xl font-bold">{stats.recentActivity.recentListings}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">New Bookings</p>
                    <p className="text-2xl font-bold">{stats.recentActivity.recentBookings}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">All Users</h2>
              <div className="card overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((u) => (
                      <tr key={u._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {u.avatar ? (
                              <img src={u.avatar} alt={u.name} className="w-10 h-10 rounded-full mr-3" />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white mr-3">
                                {u.name?.charAt(0)}
                              </div>
                            )}
                            <span className="font-medium">{u.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded ${
                            u.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                            u.role === 'teacher' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(u.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'listings' && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">All Listings</h2>
              <div className="space-y-4">
                {listings.map((listing) => (
                  <div key={listing._id} className="card">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{listing.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">
                          By {listing.teacher.name} • {listing.category}
                        </p>
                        <p className="text-gray-500 text-sm mt-1">
                          Status: <span className={`font-medium ${
                            listing.status === 'active' ? 'text-green-600' :
                            listing.status === 'inactive' ? 'text-red-600' :
                            'text-gray-600'
                          }`}>
                            {listing.status}
                          </span>
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleFlagListing(listing._id)}
                          className={`btn text-sm ${
                            listing.status === 'active' ? 'btn-danger' : 'btn-secondary'
                          }`}
                        >
                          {listing.status === 'active' ? 'Deactivate' : 'Activate'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminPanel;

