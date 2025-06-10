import React, { useState } from 'react';
import { 
  Plane, 
  Calendar, 
  Clock,
  Edit,
  Trash,
  CheckCircle,
  Filter,
  X,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { userBookings, destinations } from '../data/mockData';

const BookingManagement: React.FC = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState(userBookings);
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortDirection, setSortDirection] = useState('asc');
  
  const getLocationName = (code: string) => {
    const location = destinations.find(dest => dest.code === code);
    return location ? `${location.city} (${location.code})` : code;
  };
  
  const handleCancelBooking = (bookingId: string) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      setSelectedBooking(booking);
      setShowCancelModal(true);
    }
  };
  
  const confirmCancelBooking = () => {
    if (selectedBooking) {
      // Update booking status to cancelled
      const updatedBookings = bookings.map(booking => 
        booking.id === selectedBooking.id 
          ? { ...booking, status: 'Cancelled' } 
          : booking
      );
      
      setBookings(updatedBookings);
      setShowCancelModal(false);
      setSelectedBooking(null);
    }
  };
  
  const filteredBookings = bookings.filter(booking => {
    if (filterStatus === 'all') return true;
    return booking.status === filterStatus;
  });
  
  const sortedBookings = [...filteredBookings].sort((a, b) => {
    if (sortBy === 'date') {
      const dateA = new Date(a.departureDate).getTime();
      const dateB = new Date(b.departureDate).getTime();
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    } else if (sortBy === 'destination') {
      return sortDirection === 'asc' 
        ? a.destination.localeCompare(b.destination) 
        : b.destination.localeCompare(a.destination);
    } else {
      return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">
            Manage your flight bookings, make changes, or cancel if needed.
          </p>
        </div>
        
        {/* Filters and Sorting */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Filter className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-sm font-medium text-gray-700 mr-2">Filter:</span>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setFilterStatus('all')} 
                  className={`px-3 py-1 text-sm rounded-md ${
                    filterStatus === 'all' 
                      ? 'bg-red-600 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                <button 
                  onClick={() => setFilterStatus('Confirmed')} 
                  className={`px-3 py-1 text-sm rounded-md ${
                    filterStatus === 'Confirmed' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Confirmed
                </button>
                <button 
                  onClick={() => setFilterStatus('Pending')} 
                  className={`px-3 py-1 text-sm rounded-md ${
                    filterStatus === 'Pending' 
                      ? 'bg-yellow-500 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Pending
                </button>
                <button 
                  onClick={() => setFilterStatus('Cancelled')} 
                  className={`px-3 py-1 text-sm rounded-md ${
                    filterStatus === 'Cancelled' 
                      ? 'bg-red-500 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Cancelled
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-700 mr-2">Sort By:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-red-500 focus:border-red-500 block p-2"
                >
                  <option value="date">Date</option>
                  <option value="destination">Destination</option>
                </select>
              </div>
              
              <button 
                onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                className="px-2 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                {sortDirection === 'asc' ? (
                  <ArrowUp className="h-4 w-4 text-gray-600" />
                ) : (
                  <ArrowDown className="h-4 w-4 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Bookings List */}
        <div className="space-y-6">
          {sortedBookings.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <Plane className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">No bookings found</h3>
              <p className="text-gray-500 mb-6">
                {filterStatus === 'all' 
                  ? "You don't have any bookings yet." 
                  : `You don't have any ${filterStatus.toLowerCase()} bookings.`}
              </p>
              <button 
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Book a Flight
              </button>
            </div>
          ) : (
            sortedBookings.map((booking) => (
              <div 
                key={booking.id}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:transform hover:scale-[1.01]"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <span className="text-sm text-gray-500 mr-2">Booking Reference:</span>
                        <span className="font-medium text-gray-900">{booking.reference}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {getLocationName(booking.origin)} → {getLocationName(booking.destination)}
                      </h3>
                    </div>
                    <div className="flex flex-col items-end">
                      <span 
                        className={`px-2 py-1 text-xs rounded-full font-medium ${
                          booking.status === 'Confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : booking.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {booking.status}
                      </span>
                      <span className="text-sm text-gray-500 mt-1">
                        Booked on {new Date(booking.bookingDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8 mb-4">
                    {/* Flight Info */}
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                        <Plane className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Flight</span>
                        <p className="font-medium">AB-{booking.flightNumber}</p>
                      </div>
                    </div>
                    
                    {/* Date */}
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <Calendar className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Departure Date</span>
                        <p className="font-medium">
                          {new Date(booking.departureDate).toLocaleDateString('en-US', {
                            weekday: 'short', 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    
                    {/* Time */}
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                        <Clock className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Departure Time</span>
                        <p className="font-medium">{booking.departureTime}</p>
                      </div>
                    </div>
                    
                    {/* Class */}
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                        <CheckCircle className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Class</span>
                        <p className="font-medium">{booking.class}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-sm text-gray-500">Passenger:</span>
                      <span className="ml-1 font-medium">{user?.name}</span>
                    </div>
                    <div className="flex space-x-2">
                      {booking.status !== 'Cancelled' && (
                        <>
                          <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors flex items-center">
                            <Edit className="h-4 w-4 mr-1" />
                            Change Flight
                          </button>
                          <button 
                            className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors flex items-center"
                            onClick={() => handleCancelBooking(booking.id)}
                          >
                            <Trash className="h-4 w-4 mr-1" />
                            Cancel
                          </button>
                        </>
                      )}
                      <button className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Cancel Booking Modal */}
      {showCancelModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 animate-fadeIn">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-900">Cancel Booking</h3>
              <button 
                onClick={() => setShowCancelModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                Are you sure you want to cancel your booking from {getLocationName(selectedBooking.origin)} to {getLocationName(selectedBooking.destination)}?
              </p>
              
              <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-4">
                <p className="text-sm text-red-700">
                  Please note that cancellation fees may apply based on our cancellation policy. 
                  The refund amount will be processed within 7-10 business days.
                </p>
              </div>
              
              <div className="bg-gray-100 rounded p-4">
                <h4 className="font-medium text-gray-900 mb-2">Booking Details</h4>
                <ul className="space-y-1 text-gray-600 text-sm">
                  <li>Booking Reference: {selectedBooking.reference}</li>
                  <li>Flight: AB-{selectedBooking.flightNumber}</li>
                  <li>Date: {new Date(selectedBooking.departureDate).toLocaleDateString()}</li>
                  <li>Time: {selectedBooking.departureTime}</li>
                </ul>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Keep Booking
              </button>
              <button 
                onClick={confirmCancelBooking}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingManagement;