import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, AcademicCapIcon, UserGroupIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

const Home = () => {
  const categories = [
    { name: 'Cooking', icon: '🍳' },
    { name: 'Tech', icon: '💻' },
    { name: 'Languages', icon: '🌍' },
    { name: 'Arts', icon: '🎨' },
    { name: 'Fitness', icon: '💪' },
    { name: 'Business', icon: '💼' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Connect, Learn, Earn
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-indigo-100">
              Exchange Skills in Your Community
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/browse" className="btn bg-white text-indigo-600 hover:bg-gray-100 px-8 py-3 text-lg">
                Browse Skills
              </Link>
              <Link to="/register" className="btn bg-indigo-700 text-white hover:bg-indigo-800 px-8 py-3 text-lg">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white rounded-lg shadow-xl p-6">
          <form action="/browse" method="get" className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="search"
                placeholder="Search for skills..."
                className="input pl-10"
              />
            </div>
            <button type="submit" className="btn btn-primary px-8">
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/browse?category=${category.name}`}
              className="card text-center hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="text-4xl mb-2">{category.icon}</div>
              <h3 className="font-semibold">{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserGroupIcon className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Create an Account</h3>
              <p className="text-gray-600">
                Sign up as a learner or teacher and build your profile
              </p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <AcademicCapIcon className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Browse or Teach</h3>
              <p className="text-gray-600">
                Find skills to learn or create listings to teach your expertise
              </p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CurrencyDollarIcon className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Connect & Learn</h3>
              <p className="text-gray-600">
                Book sessions, learn new skills, and earn from teaching
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-indigo-100">
            Join thousands of learners and teachers in your community
          </p>
          <Link to="/register" className="btn bg-white text-indigo-600 hover:bg-gray-100 px-8 py-3 text-lg">
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

