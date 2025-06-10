import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, Plane } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-10 flex items-center">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6 relative">
            <Plane className="h-24 w-24 text-red-600 mx-auto transform rotate-45" />
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            This flight path doesn't exist!
          </h2>
          <p className="text-gray-600 mb-8">
            The page you're looking for has flown to an unknown destination or never existed.
            Let's get you back on the right route.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              to="/"
              className="px-6 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors inline-flex items-center justify-center"
            >
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Link>
            <Link 
              to="/search"
              className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300 transition-colors inline-flex items-center justify-center"
            >
              <Search className="mr-2 h-5 w-5" />
              Find a Flight
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;