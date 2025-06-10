import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plane, MapPin, Calendar, Users, ArrowRight, Star } from 'lucide-react';
import { destinations } from '../data/mockData';

const Home: React.FC = () => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const backgroundImages = [
    'https://images.pexels.com/photos/388415/pexels-photo-388415.jpeg',
    'https://images.pexels.com/photos/62623/wing-plane-flying-airplane-62623.jpeg',
    'https://images.pexels.com/photos/6612636/pexels-photo-6612636.jpeg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section with Background Slider */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {backgroundImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out bg-cover bg-center ${
              index === currentBgIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${img})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>
        ))}

        <div className="relative container mx-auto px-4 z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fadeIn">
              Fly with Angry Birds Airlines
            </h1>
            <p className="text-xl text-white mb-8 animate-fadeIn animation-delay-200">
              Experience excellence in the skies with our award-winning service and unbeatable prices.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 animate-fadeIn animation-delay-400">
              <Link
                to="/search"
                className="px-6 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors inline-flex items-center justify-center"
              >
                <Plane className="mr-2 h-5 w-5" />
                Book Flights
              </Link>
              <Link
                to="/promotions"
                className="px-6 py-3 bg-yellow-500 text-gray-900 font-semibold rounded-md hover:bg-yellow-600 transition-colors inline-flex items-center justify-center"
              >
                <Star className="mr-2 h-5 w-5" />
                View Promotions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Flight Search */}
      <section className="bg-white py-10">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-xl p-6 -mt-20 relative z-20 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Find Your Flight</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">From</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <select className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500">
                    <option value="">Select origin</option>
                    {destinations.map((dest) => (
                      <option key={dest.code} value={dest.code}>{dest.city} ({dest.code})</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">To</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <select className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500">
                    <option value="">Select destination</option>
                    {destinations.map((dest) => (
                      <option key={dest.code} value={dest.code}>{dest.city} ({dest.code})</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Departure</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="date" 
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Passengers</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <select className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500">
                    <option value="1">1 Passenger</option>
                    <option value="2">2 Passengers</option>
                    <option value="3">3 Passengers</option>
                    <option value="4">4 Passengers</option>
                    <option value="5">5+ Passengers</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <Link 
                to="/search"
                className="w-full md:w-auto px-6 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors inline-flex items-center justify-center"
              >
                Search Flights
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Destinations */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Destinations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our most popular flight destinations and plan your next adventure with Angry Birds Airlines.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.slice(0, 6).map((destination, index) => (
              <div 
                key={destination.code}
                className="bg-white rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105"
              >
                <img 
                  src={destination.image} 
                  alt={destination.city} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{destination.city}</h3>
                  <p className="text-gray-600 mb-4">{destination.country}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-red-600 font-bold">From ${destination.price}</span>
                    <Link 
                      to="/search" 
                      className="text-red-600 hover:text-red-800 font-medium inline-flex items-center"
                    >
                      Book Now
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link 
              to="/search"
              className="px-6 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors inline-flex items-center justify-center"
            >
              View All Destinations
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Fly With Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              At Angry Birds Airlines, we are committed to providing the best flying experience possible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg text-center transition-transform hover:transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plane className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Modern Fleet</h3>
              <p className="text-gray-600">Our modern aircraft fleet ensures safety, comfort, and efficiency.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg text-center transition-transform hover:transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Award-Winning Service</h3>
              <p className="text-gray-600">Enjoy our globally recognized customer service and hospitality.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg text-center transition-transform hover:transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Friendly Crew</h3>
              <p className="text-gray-600">Our friendly and professional crew is always ready to assist you.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg text-center transition-transform hover:transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Flexible Bookings</h3>
              <p className="text-gray-600">Change or cancel your flights with ease and minimal fees.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Current Promotions */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Special Offers</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Take advantage of our limited-time promotions and save on your next flight.
            </p>
          </div>
          
          <div className="flex overflow-x-auto space-x-6 pb-6 scrollbar-hide snap-x">
            <div className="snap-start min-w-[300px] md:min-w-[400px] bg-gradient-to-r from-red-600 to-red-800 rounded-lg p-6 flex-shrink-0">
              <h3 className="text-2xl font-bold mb-2">Early Bird Special</h3>
              <p className="text-gray-200 mb-4">Book 60 days in advance and save up to 30% on your flight.</p>
              <Link 
                to="/promotions"
                className="px-4 py-2 bg-white text-red-600 font-medium rounded-md hover:bg-gray-100 transition-colors inline-flex items-center"
              >
                Learn More
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="snap-start min-w-[300px] md:min-w-[400px] bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg p-6 flex-shrink-0">
              <h3 className="text-2xl font-bold mb-2">Family Package</h3>
              <p className="text-gray-900 mb-4">Children under 12 fly for 50% off when traveling with family.</p>
              <Link 
                to="/promotions"
                className="px-4 py-2 bg-white text-yellow-600 font-medium rounded-md hover:bg-gray-100 transition-colors inline-flex items-center"
              >
                Learn More
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="snap-start min-w-[300px] md:min-w-[400px] bg-gradient-to-r from-green-600 to-green-800 rounded-lg p-6 flex-shrink-0">
              <h3 className="text-2xl font-bold mb-2">Weekend Getaway</h3>
              <p className="text-gray-200 mb-4">Fly on weekends and get 20% off on your return ticket.</p>
              <Link 
                to="/promotions"
                className="px-4 py-2 bg-white text-green-600 font-medium rounded-md hover:bg-gray-100 transition-colors inline-flex items-center"
              >
                Learn More
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="snap-start min-w-[300px] md:min-w-[400px] bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 flex-shrink-0">
              <h3 className="text-2xl font-bold mb-2">Business Class Upgrade</h3>
              <p className="text-gray-200 mb-4">Pay for Economy, get upgraded to Business Class when available.</p>
              <Link 
                to="/promotions"
                className="px-4 py-2 bg-white text-blue-600 font-medium rounded-md hover:bg-gray-100 transition-colors inline-flex items-center"
              >
                Learn More
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link 
              to="/promotions"
              className="px-6 py-3 bg-white text-red-600 font-semibold rounded-md hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              View All Promotions
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;