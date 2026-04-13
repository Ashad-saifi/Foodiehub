import React, { useState } from 'react';
import { FaFilter, FaStar } from 'react-icons/fa';

const FilterBar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    rating: '',
    cuisine: '',
    price: '',
    distance: '',
  });

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const cuisines = ['All', 'Italian', 'American', 'Japanese', 'Mexican', 'Indian', 'Chinese'];
  const priceRanges = ['All', '$', '$$', '$$$', '$$$$'];
  const distances = ['All', '< 1km', '1-2km', '2-3km', '> 3km'];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="flex items-center mb-4">
        <FaFilter className="text-gray-500 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Rating Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
          <select
            value={filters.rating}
            onChange={(e) => handleFilterChange('rating', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">All Ratings</option>
            <option value="4.5">4.5+ Stars</option>
            <option value="4.0">4.0+ Stars</option>
            <option value="3.5">3.5+ Stars</option>
            <option value="3.0">3.0+ Stars</option>
          </select>
        </div>

        {/* Cuisine Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Cuisine</label>
          <select
            value={filters.cuisine}
            onChange={(e) => handleFilterChange('cuisine', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {cuisines.map((cuisine) => (
              <option key={cuisine} value={cuisine === 'All' ? '' : cuisine}>
                {cuisine}
              </option>
            ))}
          </select>
        </div>

        {/* Price Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
          <select
            value={filters.price}
            onChange={(e) => handleFilterChange('price', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {priceRanges.map((price) => (
              <option key={price} value={price === 'All' ? '' : price}>
                {price}
              </option>
            ))}
          </select>
        </div>

        {/* Distance Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Distance</label>
          <select
            value={filters.distance}
            onChange={(e) => handleFilterChange('distance', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {distances.map((distance) => (
              <option key={distance} value={distance === 'All' ? '' : distance}>
                {distance}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Clear Filters */}
      <div className="mt-4">
        <button
          onClick={() => {
            setFilters({ rating: '', cuisine: '', price: '', distance: '' });
            onFilterChange({ rating: '', cuisine: '', price: '', distance: '' });
          }}
          className="text-orange-500 hover:text-orange-600 text-sm font-medium"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

export default FilterBar;