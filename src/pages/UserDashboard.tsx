import React from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  CreditCard, 
  Plane, 
  Calendar, 
  Bell, 
  Tag, 
  MapPin, 
  Clock, 
  Check, 
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { userBookings, destinations } from '../data/mockData';

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  
  const getLocationName = (code: string) => {
    const location = destinations.find(dest => dest.code === code);
    return location ? `${location.city} (${location.code})` : code;
  };
  
  // Filter to show only upcoming flights
  const upcomingFlights = userBookings.filter(
    booking => new Date(booking.departureDate) > new Date()
  );
  
  // Filter completed flights
  const pastFlights = userBookings.filter(
    booking => new Date(booking.departureDate) <= new Date()
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* User Profile */}
              <div className="bg-red-600 p-6 text-white">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{user?.name}</h2>
                    <p className="text-red-100">{user?.email}</p>
                  </div>
                </div>
              </div>
              
              {/* Dashboard Navigation */}
              <nav className="p-4">
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/dashboard"
                      className="flex items-center p-3 text-gray-800 bg-red-50 rounded-md font-medium"
                    >
                      <User className="h-5 w-5 mr-3 text-red-600" />
                      My Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/bookings"
                      className="flex items-center p-3 text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                    >
                      <Calendar className="h-5 w-5 mr-3 text-gray-500" />
                      My Bookings
                    </Link>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-3 text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                    >
                      <CreditCard className="h-5 w-5 mr-3 text-gray-500" />
                      Payment Methods
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-3 text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                    >
                      <Plane className="h-5 w-5 mr-3 text-gray-500" />
                      Travel Preferences
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-3 text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                    >
                      <Bell className="h-5 w-5 mr-3 text-gray-500" />
                      Notifications
                    </a>
                  </li>
                </ul>
              </nav>
              
              {/* Reward Status */}
              <div className="border-t border-gray-200 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-gray-800">Reward Status</h3>
                  <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Gold</span>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Miles earned</span>
                    <span className="font-medium">4,250 / 10,000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '42.5%' }}></div>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-red-600 text-sm font-medium hover:text-red-800 inline-flex items-center"
                >
                  View Benefits
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-6 text-white">
              <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name.split(' ')[0]}!</h1>
              <p className="mb-4">Keep track of your travels and manage your bookings easily.</p>
              <div className="flex space-x-4">
                <Link
                  to="/search"
                  className="px-4 py-2 bg-white text-red-600 rounded-md font-medium hover:bg-gray-100 transition-colors"
                >
                  Book a Flight
                </Link>
                <Link
                  to="/promotions"
                  className="px-4 py-2 bg-red-500 text-white rounded-md font-medium hover:bg-red-400 transition-colors"
                >
                  View Promotions
                </Link>
              </div>
            </div>
            
            {/* Upcoming Flights */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Upcoming Flights</h2>
                <Link
                  to="/bookings"
                  className="text-red-600 text-sm font-medium hover:text-red-800 inline-flex items-center"
                >
                  View All
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              
              {upcomingFlights.length === 0 ? (
                <div className="text-center py-8">
                  <Plane className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-gray-500 font-medium mb-2">No upcoming flights</h3>
                  <p className="text-gray-400 mb-4">Time to plan your next adventure!</p>
                  <Link
                    to="/search"
                    className="px-4 py-2 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition-colors inline-block"
                  >
                    Book a Flight
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingFlights.slice(0, 2).map((booking) => (
                    <div key={booking.id} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <span className="text-sm text-gray-500">Flight {booking.flightNumber}</span>
                          <h3 className="font-medium text-gray-900">
                            {getLocationName(booking.origin)} → {getLocationName(booking.destination)}
                          </h3>
                        </div>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {booking.status}
                        </span>
                      </div>
                      
                      <div className="flex space-x-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                          {new Date(booking.departureDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-gray-400" />
                          {booking.departureTime}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                        <div className="flex items-center text-sm">
                          <Check className="h-4 w-4 mr-1 text-green-500" />
                          <span className="text-gray-600">Check-in available</span>
                        </div>
                        <button className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors">
                          Check In
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Special Offers */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Special Offers For You</h2>
                <Link
                  to="/promotions"
                  className="text-red-600 text-sm font-medium hover:text-red-800 inline-flex items-center"
                >
                  View All
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg p-4 text-gray-900">
                  <div className="flex justify-between items-start">
                    <div>
                      <Tag className="h-6 w-6 mb-2" />
                      <h3 className="font-bold text-lg mb-1">Weekend Sale</h3>
                      <p className="text-sm">20% off on all weekend flights</p>
                    </div>
                    <span className="text-xl font-bold">20%</span>
                  </div>
                  <div className="mt-4 pt-2 border-t border-yellow-300 flex justify-between items-center">
                    <span className="text-xs">Valid until June 30, 2025</span>
                    <button className="text-xs font-medium bg-yellow-600 text-white px-2 py-1 rounded">
                      Use Now
                    </button>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-400 to-green-500 rounded-lg p-4 text-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <MapPin className="h-6 w-6 mb-2" />
                      <h3 className="font-bold text-lg mb-1">Spring Destinations</h3>
                      <p className="text-sm">Special fares on select destinations</p>
                    </div>
                    <span className="text-xl font-bold">$99+</span>
                  </div>
                  <div className="mt-4 pt-2 border-t border-green-300 flex justify-between items-center">
                    <span className="text-xs">Valid until May 15, 2025</span>
                    <button className="text-xs font-medium bg-green-600 text-white px-2 py-1 rounded">
                      View Deals
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              
              <div className="space-y-4">
                {pastFlights.slice(0, 3).map((flight, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-gray-100 rounded-full p-2 mr-4">
                      <Plane className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Flight from {getLocationName(flight.origin)} to {getLocationName(flight.destination)}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {new Date(flight.departureDate).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;