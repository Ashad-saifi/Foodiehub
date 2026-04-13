import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const RestaurantCard = ({ restaurant }) => {
  return (
    <Link
      to={`/restaurant/${restaurant.id}`}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
    >
      <div className="relative">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {!restaurant.isOpen && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
            Closed
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{restaurant.name}</h3>

        <div className="flex items-center mb-2">
          <div className="flex items-center mr-4">
            <FaStar className="text-yellow-400 mr-1" />
            <span className="text-sm font-medium">{restaurant.rating}</span>
            <span className="text-sm text-gray-500 ml-1">({restaurant.reviews})</span>
          </div>
          <span className="text-sm text-gray-500">{restaurant.priceRange}</span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <div className="flex items-center">
            <FaMapMarkerAlt className="mr-1" />
            <span>{restaurant.distance}</span>
          </div>
          <div className="flex items-center">
            <FaClock className="mr-1" />
            <span>{restaurant.deliveryTime}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600">{restaurant.cuisine}</p>
      </div>
    </Link>
  );
};

export default RestaurantCard;