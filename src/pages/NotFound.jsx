import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <div className="text-8xl mb-6">🍽️</div>
        <h1 className="text-9xl font-extrabold text-orange-500 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back to the food!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="bg-orange-500 text-white px-8 py-3 rounded-full font-medium hover:bg-orange-600 transition-colors"
          >
            Go Home
          </Link>
          <Link
            to="/restaurants"
            className="bg-white text-orange-500 border-2 border-orange-500 px-8 py-3 rounded-full font-medium hover:bg-orange-50 transition-colors"
          >
            Browse Restaurants
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
