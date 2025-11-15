import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [exploreMenuOpen, setExploreMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      {/* Black Navigation Bar - Top Meta Nav - Exact Coursera Structure */}
      <div className="rc-GlobalPageHeaderContainer css-1ch79bo" style={{}}>
        <nav data-testid="page-header-wrapper" data-e2e="page-header" className="css-1pf5qcx">
          <div className="css-o6cx9a">
            {/* Black Nav Bar - Sticky at top - Full width background */}
            <div className="bg-black sticky top-0 z-50 w-full">
              <div className="max-w-coursera mx-auto px-4 sm:px-6 lg:px-8">
                <div className="hidden lg:block">
                  <div className="css-az8ufr">
                    <div role="navigation" aria-label="Banner" className="css-j6ha89">
                      <ul className="css-f31nvc">
                        <li className="css-1dswftd">
                          <Link 
                            to="/" 
                            className="cds-119 cds-113 cds-115 css-12x0a78 cds-142"
                            aria-current="page"
                          >
                            <span>
                              <span className="forStyle css-1rkctw9">For</span>Individuals
                            </span>
                          </Link>
                        </li>
                        <li className="css-1dswftd">
                          <Link 
                            to="/business" 
                            className="cds-119 cds-113 cds-115 css-1m1g454 cds-142"
                          >
                            <span>
                              <span className="forStyle css-1rkctw9">For</span>Businesses
                            </span>
                          </Link>
                        </li>
                        <li className="css-1dswftd">
                          <Link 
                            to="/campus" 
                            className="cds-119 cds-113 cds-115 css-1m1g454 cds-142"
                          >
                            <span>
                              <span className="forStyle css-1rkctw9">For</span>Universities
                            </span>
                          </Link>
                        </li>
                        <li className="css-1dswftd">
                          <Link 
                            to="/government" 
                            className="cds-119 cds-113 cds-115 css-1m1g454 cds-142"
                          >
                            <span>
                              <span className="forStyle css-1rkctw9">For</span>Governments
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Header - Sticky below black nav - Full width background */}
            <div className="css-1l23jbm">
              <header className="bg-white border-b border-neutral-border sticky top-0 lg:top-[40px] z-40 w-full">
                <div className="max-w-coursera mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Left Group: Logo, Explore */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center" aria-label="LocalSkill" data-testid="home-logo">
                <span className="text-2xl font-bold text-primary">LocalSkill</span>
              </Link>
            </div>

            {/* Explore Button - Desktop */}
            <div className="hidden md:flex items-center">
              <div className="relative">
                <button
                  onClick={() => setExploreMenuOpen(!exploreMenuOpen)}
                  className="text-text-secondary hover:text-primary transition-colors text-sm font-medium flex items-center px-3 py-2 rounded-md hover:bg-gray-50"
                  aria-label="Explore our catalog"
                  aria-expanded={exploreMenuOpen}
                  type="button"
                >
                  Explore
                  <ChevronDownIcon className="ml-1 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Center: Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 justify-center items-center">
            <div className="rc-SearchBar isLohpRebrand">
              <form onSubmit={handleSearch} className="search-form" role="search">
                <div className="magnifier-wrapper left-magnifier">
                  <MagnifyingGlassIcon className="h-5 w-5" style={{ color: '#5b6780' }} />
                </div>
                <input
                  type="text"
                  id="algolia-placeholder-search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What do you want to learn?"
                  className="coursera-search-input"
                  aria-label="What do you want to learn?"
                  role="textbox"
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="search-button"
                  aria-label="Submit Search"
                >
                  <div className="magnifier-wrapper search-button-magnifier">
                    <MagnifyingGlassIcon className="h-5 w-5 text-white" />
                  </div>
                </button>
              </form>
            </div>
          </div>

          {/* Right Group: Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 flex-shrink-0">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-text-secondary hover:text-primary transition-colors text-sm font-medium" aria-label="Dashboard">
                  My Learning
                </Link>
                <Link to={`/profile/${user?.id}`} className="flex items-center space-x-2">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-semibold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </Link>
              </>
            ) : (
              <>
                        <Link 
                          to="/login" 
                          className="text-text-secondary hover:text-primary transition-colors text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-50"
                          role="button"
                        >
                  Log In
                </Link>
                        <Link 
                          to="/register" 
                          className="btn btn-primary"
                          role="button"
                        >
                  Join for Free
                </Link>
              </>
            )}
          </div>

          {/* Mobile Search & Menu */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              className="p-2 rounded-md text-text-secondary hover:bg-neutral-gray"
              onClick={() => navigate('/browse')}
              aria-label="Search"
                      type="button"
            >
              <MagnifyingGlassIcon className="h-6 w-6" />
            </button>
            <button
              className="p-2 rounded-md text-text-secondary hover:bg-neutral-gray"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                      aria-label="Open Navigation Menu"
                      type="button"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-neutral-border space-y-4">
            <form onSubmit={handleSearch} className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-secondary" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What do you want to learn?"
                className="w-full pl-10 pr-4 py-2 border border-neutral-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              />
            </form>
            <Link
              to="/browse"
              className="block text-text-secondary hover:text-primary transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Explore
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="block text-text-secondary hover:text-primary transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Learning
                </Link>
                <Link
                  to={`/profile/${user?.id}`}
                  className="block text-text-secondary hover:text-primary transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-text-secondary hover:text-primary transition-colors font-medium"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-text-secondary hover:text-primary transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="block btn btn-primary text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Join for Free
                </Link>
              </>
            )}
          </div>
        )}
                </div>
              </header>
            </div>
          </div>
      </nav>
      </div>
    </>
  );
};

export default Header;
