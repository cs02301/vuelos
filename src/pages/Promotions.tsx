import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Tag, 
  Calendar, 
  Clock, 
  Users, 
  Plane, 
  Filter,
  Search,
  ArrowRight,
  MapPin,
  Sparkles
} from 'lucide-react';
import { promotions, destinations } from '../data/mockData';

const Promotions: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const categories = [
    { id: 'all', name: 'All Offers' },
    { id: 'discount', name: 'Discounts' },
    { id: 'destination', name: 'Destinations' },
    { id: 'seasonal', name: 'Seasonal' },
    { id: 'family', name: 'Family' }
  ];
  
  const filteredPromotions = promotions.filter(promo => {
    const matchesCategory = activeCategory === 'all' || promo.category === activeCategory;
    const matchesSearch = promo.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         promo.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-10">
      <div className="container mx-auto px-4">
        {/* Hero Banner */}
        <div className="relative bg-gradient-to-r from-red-600 to-red-800 rounded-xl overflow-hidden mb-8">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-pattern"></div>
          </div>
          <div className="relative p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Special Promotions</h1>
            <p className="text-red-100 text-lg max-w-2xl mb-6">
              Discover our latest offers and deals to make your next trip even more affordable.
              Don't miss out on these limited-time promotions!
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Link
                to="/search"
                className="px-4 py-2 bg-white text-red-600 rounded-md font-medium hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                <Plane className="h-5 w-5 mr-2" />
                Book with Promo
              </Link>
              <a
                href="#deals"
                className="px-4 py-2 bg-red-500 text-white rounded-md font-medium hover:bg-red-400 transition-colors inline-flex items-center justify-center"
              >
                <Tag className="h-5 w-5 mr-2" />
                View Top Deals
              </a>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-32 h-32 transform translate-y-1/4 translate-x-1/4 opacity-20">
            <Sparkles className="w-full h-full text-yellow-400" />
          </div>
        </div>
        
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 justify-between">
            {/* Search */}
            <div className="relative flex-grow max-w-xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search promotions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 -mx-2 px-2">
              <Filter className="h-5 w-5 text-gray-500 mr-1 flex-shrink-0" />
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-3 py-1 rounded-md text-sm font-medium whitespace-nowrap ${
                    activeCategory === category.id
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Featured Promotions */}
        <div id="deals" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Deals</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPromotions.filter(promo => promo.featured).map((promo) => (
              <div 
                key={promo.id}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:transform hover:scale-[1.02]"
              >
                <div className="relative h-48">
                  <img 
                    src={promo.image} 
                    alt={promo.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 right-0 mt-3 mr-3">
                    <span className={`inline-block px-3 py-1 text-sm font-bold rounded-full ${
                      promo.category === 'discount' ? 'bg-yellow-400 text-yellow-900' :
                      promo.category === 'destination' ? 'bg-green-500 text-white' :
                      promo.category === 'seasonal' ? 'bg-blue-500 text-white' :
                      'bg-purple-500 text-white'
                    }`}>
                      {promo.category === 'discount' ? `${promo.discount}% OFF` : 
                       promo.category === 'destination' ? 'Destination' :
                       promo.category === 'seasonal' ? 'Seasonal' : 'Family'}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-24"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-white font-bold text-xl">{promo.title}</h3>
                  </div>
                </div>
                
                <div className="p-5">
                  <p className="text-gray-600 mb-4">{promo.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-red-500" />
                      Valid until {new Date(promo.validUntil).toLocaleDateString()}
                    </div>
                    
                    {promo.minimumStay && (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-red-500" />
                        Min. {promo.minimumStay} days
                      </div>
                    )}
                  </div>
                  
                  {promo.destinations && (
                    <div className="mb-4">
                      <div className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="h-4 w-4 mr-1 text-red-500" />
                        Destinations
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {promo.destinations.map((destCode: string) => {
                          const dest = destinations.find(d => d.code === destCode);
                          return (
                            <span key={destCode} className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs">
                              {dest ? dest.city : destCode}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    {promo.priceFrom && (
                      <div>
                        <span className="text-gray-500 text-sm">From</span>
                        <span className="text-xl font-bold text-red-600 ml-1">${promo.priceFrom}</span>
                      </div>
                    )}
                    <Link
                      to="/search"
                      className="inline-flex items-center text-red-600 font-medium hover:text-red-800"
                    >
                      Book Now
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* All Promotions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Available Promotions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPromotions.filter(promo => !promo.featured).map((promo) => (
              <div 
                key={promo.id}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg"
              >
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-lg text-gray-900">{promo.title}</h3>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                      promo.category === 'discount' ? 'bg-yellow-100 text-yellow-800' :
                      promo.category === 'destination' ? 'bg-green-100 text-green-800' :
                      promo.category === 'seasonal' ? 'bg-blue-100 text-blue-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {promo.category === 'discount' ? `${promo.discount}% OFF` : 
                       promo.category === 'destination' ? 'Destination' :
                       promo.category === 'seasonal' ? 'Seasonal' : 'Family'}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{promo.description}</p>
                  
                  <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                      Valid until {new Date(promo.validUntil).toLocaleDateString()}
                    </div>
                    
                    {promo.minimumStay && (
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1 text-gray-400" />
                        Min. {promo.minimumStay} days
                      </div>
                    )}
                    
                    {promo.maxPersons && (
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1 text-gray-400" />
                        Max. {promo.maxPersons} persons
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    {promo.priceFrom && (
                      <div>
                        <span className="text-gray-500 text-xs">From</span>
                        <span className="text-lg font-bold text-red-600 ml-1">${promo.priceFrom}</span>
                      </div>
                    )}
                    <Link
                      to="/search"
                      className="inline-flex items-center text-sm text-red-600 font-medium hover:text-red-800"
                    >
                      View Details
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Newsletter Subscription */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-blue-100 mb-6">
                Be the first to know about our special promotions, new destinations, and exclusive deals.
              </p>
              <form className="flex flex-col sm:flex-row max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-3 rounded-md sm:rounded-r-none mb-2 sm:mb-0 focus:outline-none focus:ring-2 focus:ring-white flex-grow"
                />
                <button
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-medium px-6 py-3 rounded-md sm:rounded-l-none transition-colors"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-blue-200 text-xs mt-4">
                By subscribing, you agree to receive marketing emails from Angry Birds Airlines.
                You can unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotions;