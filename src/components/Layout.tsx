import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Menu,
  X,
  Plane,
  User,
  LogOut,
  LogIn,
  Package,
  Calendar,
  Search,
  Tag
} from 'lucide-react';
import Footer from './Footer';

const Layout: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header 
        className={`fixed w-full top-0 z-50 transition-all duration-300 ease-in-out ${
          isScrolled || !location.pathname.startsWith('/') || location.pathname !== '/'
            ? 'bg-white shadow-md py-2' 
            : 'bg-transparent py-4'
        }`}
      >
        <nav className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Plane 
              className={`h-8 w-8 ${
                isScrolled || !location.pathname.startsWith('/') || location.pathname !== '/'
                  ? 'text-red-600' 
                  : 'text-white'
              }`} 
              strokeWidth={2.5}
            />
            <span 
              className={`font-bold text-xl ${
                isScrolled || !location.pathname.startsWith('/') || location.pathname !== '/'
                  ? 'text-gray-800' 
                  : 'text-white'
              }`}
            >
              Angry Birds Airlines
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/search" 
              className={`font-medium ${
                isScrolled || !location.pathname.startsWith('/') || location.pathname !== '/'
                  ? 'text-gray-700 hover:text-red-600' 
                  : 'text-white hover:text-yellow-300'
              } transition-colors`}
            >
              Find Flights
            </Link>
            <Link 
              to="/promotions" 
              className={`font-medium ${
                isScrolled || !location.pathname.startsWith('/') || location.pathname !== '/'
                  ? 'text-gray-700 hover:text-red-600' 
                  : 'text-white hover:text-yellow-300'
              } transition-colors`}
            >
              Promotions
            </Link>
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`font-medium ${
                    isScrolled || !location.pathname.startsWith('/') || location.pathname !== '/'
                      ? 'text-gray-700 hover:text-red-600' 
                      : 'text-white hover:text-yellow-300'
                  } transition-colors`}
                >
                  My Dashboard
                </Link>
                <Link 
                  to="/bookings" 
                  className={`font-medium ${
                    isScrolled || !location.pathname.startsWith('/') || location.pathname !== '/'
                      ? 'text-gray-700 hover:text-red-600' 
                      : 'text-white hover:text-yellow-300'
                  } transition-colors`}
                >
                  My Bookings
                </Link>
                <button 
                  onClick={handleLogout}
                  className={`flex items-center font-medium ${
                    isScrolled || !location.pathname.startsWith('/') || location.pathname !== '/'
                      ? 'text-gray-700 hover:text-red-600' 
                      : 'text-white hover:text-yellow-300'
                  } transition-colors`}
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className={`flex items-center font-medium ${
                    isScrolled || !location.pathname.startsWith('/') || location.pathname !== '/'
                      ? 'text-gray-700 hover:text-red-600' 
                      : 'text-white hover:text-yellow-300'
                  } transition-colors`}
                >
                  <LogIn className="w-4 h-4 mr-1" />
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className={`px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors font-medium`}
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              <X className={`h-6 w-6 ${
                isScrolled || !location.pathname.startsWith('/') || location.pathname !== '/'
                  ? 'text-gray-800' 
                  : 'text-white'
              }`} />
            ) : (
              <Menu className={`h-6 w-6 ${
                isScrolled || !location.pathname.startsWith('/') || location.pathname !== '/'
                  ? 'text-gray-800' 
                  : 'text-white'
              }`} />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg animate-fadeIn">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <Link 
                to="/search" 
                className="flex items-center text-gray-700 hover:text-red-600 py-2"
              >
                <Search className="w-5 h-5 mr-2" />
                Find Flights
              </Link>
              <Link 
                to="/promotions" 
                className="flex items-center text-gray-700 hover:text-red-600 py-2"
              >
                <Tag className="w-5 h-5 mr-2" />
                Promotions
              </Link>
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="flex items-center text-gray-700 hover:text-red-600 py-2"
                  >
                    <User className="w-5 h-5 mr-2" />
                    My Dashboard
                  </Link>
                  <Link 
                    to="/bookings" 
                    className="flex items-center text-gray-700 hover:text-red-600 py-2"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    My Bookings
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center text-gray-700 hover:text-red-600 py-2"
                  >
                    <LogOut className="w-5 h-5 mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="flex items-center text-gray-700 hover:text-red-600 py-2"
                  >
                    <LogIn className="w-5 h-5 mr-2" />
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="w-full py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors text-center font-medium"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow pt-16">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;