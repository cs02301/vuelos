import React, { useState } from 'react';
import { 
  Plane, 
  MapPin, 
  Calendar, 
  Users, 
  Search,
  ArrowRight,
  Clock,
  DollarSign,
  CreditCard
} from 'lucide-react';
import { destinations, flights } from '../data/mockData';

// Flight class options
const flightClasses = [
  { id: 'economy', name: 'Economy' },
  { id: 'premium', name: 'Premium Economy' },
  { id: 'business', name: 'Business' },
  { id: 'first', name: 'First Class' }
];

const FlightSearch: React.FC = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [flightClass, setFlightClass] = useState('economy');
  const [isRoundTrip, setIsRoundTrip] = useState(true);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setHasSearched(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Filter flights based on search criteria
      const filteredFlights = flights.filter(flight => 
        (!origin || flight.origin === origin) &&
        (!destination || flight.destination === destination) &&
        (!departureDate || new Date(flight.departureDate).toISOString().split('T')[0] === departureDate)
      );
      
      setSearchResults(filteredFlights);
      setIsLoading(false);
    }, 1500);
  };

  const getLocationName = (code: string) => {
    const location = destinations.find(dest => dest.code === code);
    return location ? `${location.city} (${location.code})` : code;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Find Flights</h1>
          
          <form onSubmit={handleSearch}>
            {/* Trip Type Selection */}
            <div className="flex space-x-4 mb-6">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-red-600"
                  checked={isRoundTrip}
                  onChange={() => setIsRoundTrip(true)}
                />
                <span className="ml-2 text-gray-700">Round Trip</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-red-600"
                  checked={!isRoundTrip}
                  onChange={() => setIsRoundTrip(false)}
                />
                <span className="ml-2 text-gray-700">One Way</span>
              </label>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Origin */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">From</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <select 
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                  >
                    <option value="">Select origin</option>
                    {destinations.map((dest) => (
                      <option key={`origin-${dest.code}`} value={dest.code}>
                        {dest.city} ({dest.code})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Destination */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">To</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <select 
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                  >
                    <option value="">Select destination</option>
                    {destinations.map((dest) => (
                      <option key={`dest-${dest.code}`} value={dest.code}>
                        {dest.city} ({dest.code})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Departure Date */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Departure Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="date" 
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
              </div>
              
              {/* Return Date - Only shown for round trips */}
              {isRoundTrip && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Return Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="date" 
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      min={departureDate || new Date().toISOString().split('T')[0]}
                      required={isRoundTrip}
                    />
                  </div>
                </div>
              )}
              
              {/* Passengers */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Passengers</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <select 
                    value={passengers}
                    onChange={(e) => setPassengers(parseInt(e.target.value))}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Passenger' : 'Passengers'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Flight Class */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Class</label>
                <div className="relative">
                  <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <select 
                    value={flightClass}
                    onChange={(e) => setFlightClass(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    {flightClasses.map(option => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            {/* Search Button */}
            <div className="mt-6">
              <button 
                type="submit"
                className="w-full md:w-auto px-6 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors inline-flex items-center justify-center disabled:bg-red-400 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <span className="animate-spin h-5 w-5 mr-2 border-b-2 border-white rounded-full"></span>
                    Searching...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Search className="mr-2 h-5 w-5" />
                    Search Flights
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
        
        {/* Search Results Section */}
        <div className="space-y-6">
          {hasSearched && (
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Search Results
              {searchResults.length > 0 && (
                <span className="text-gray-500 text-base font-normal ml-2">
                  ({searchResults.length} flights found)
                </span>
              )}
            </h2>
          )}
          
          {hasSearched && searchResults.length === 0 && !isLoading && (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="flex justify-center mb-4">
                <Plane className="h-12 w-12 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No Flights Found</h3>
              <p className="text-gray-600 mb-4">
                We couldn't find any flights matching your search criteria.
              </p>
              <p className="text-gray-600">
                Try adjusting your search parameters or selecting different dates.
              </p>
            </div>
          )}
          
          {/* Flight Cards */}
          {searchResults.map((flight, index) => (
            <div 
              key={flight.id}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:transform hover:scale-[1.01]"
            >
              <div className="p-6">
                <div className="md:flex justify-between items-center">
                  {/* Flight Info */}
                  <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-8 mb-4 md:mb-0">
                    {/* Airline Logo and Flight Number */}
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                        <Plane className="h-6 w-6 text-red-600" />
                      </div>
                      <span className="text-sm text-gray-500 mt-1">AB-{flight.flightNumber}</span>
                    </div>
                    
                    {/* Departure */}
                    <div className="flex flex-col">
                      <span className="text-lg font-bold">{flight.departureTime}</span>
                      <span className="text-sm text-gray-500">{getLocationName(flight.origin)}</span>
                      <span className="text-xs text-gray-400">
                        {new Date(flight.departureDate).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                    
                    {/* Flight Duration */}
                    <div className="flex flex-col items-center">
                      <div className="relative w-24 md:w-32">
                        <div className="border-t-2 border-gray-300 absolute top-3 w-full"></div>
                        <div className="flex justify-between">
                          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                        </div>
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        {flight.duration}
                      </div>
                    </div>
                    
                    {/* Arrival */}
                    <div className="flex flex-col">
                      <span className="text-lg font-bold">{flight.arrivalTime}</span>
                      <span className="text-sm text-gray-500">{getLocationName(flight.destination)}</span>
                      <span className="text-xs text-gray-400">
                        {new Date(flight.arrivalDate).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                  </div>
                  
                  {/* Price and Book */}
                  <div className="flex flex-col items-end">
                    <div className="flex items-center mb-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      <span className="text-2xl font-bold text-gray-900">{flight.price}</span>
                    </div>
                    <span className="text-sm text-gray-500 mb-4">per passenger</span>
                    <button 
                      className="px-6 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors inline-flex items-center"
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Book Now
                    </button>
                  </div>
                </div>
                
                {/* Flight Details - Expandable */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                        On Time
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {flightClasses.find(c => c.id === flightClass)?.name || 'Economy'}
                      </span>
                    </div>
                    <button className="text-red-600 text-sm font-medium hover:text-red-800">
                      View Details <ArrowRight className="inline-block ml-1 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlightSearch;