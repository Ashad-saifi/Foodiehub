import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar, FaClock, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import FoodItemCard from '../components/FoodItemCard';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import { fetchRestaurantDetails } from '../services/api';

const RestaurantDetails = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const loadRestaurant = async () => {
      try {
        const data = await fetchRestaurantDetails(id);
        setRestaurant(data);
      } catch (error) {
        console.error('Error loading restaurant:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRestaurant();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!restaurant) {
    return (
      <EmptyState
        title="Restaurant not found"
        description="The restaurant you're looking for doesn't exist or has been removed."
      />
    );
  }

  const categories = ['All', ...new Set(restaurant.menu.map(item => item.category))];
  const filteredMenu = selectedCategory === 'All'
    ? restaurant.menu
    : restaurant.menu.filter(item => item.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Restaurant Header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="relative h-64 md:h-80">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          {!restaurant.isOpen && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Closed
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{restaurant.name}</h1>
              <p className="text-gray-600 mb-4">{restaurant.description}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span className="font-medium">{restaurant.rating}</span>
                  <span className="ml-1">({restaurant.reviews} reviews)</span>
                </div>
                <div className="flex items-center">
                  <FaClock className="mr-1" />
                  <span>{restaurant.deliveryTime}</span>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-1" />
                  <span>{restaurant.distance}</span>
                </div>
                <span className="font-medium text-orange-500">{restaurant.priceRange}</span>
              </div>
            </div>

            <div className="mt-4 md:mt-0 text-right">
              <div className="text-2xl font-bold text-orange-500 mb-2">
                {restaurant.cuisine}
              </div>
              <div className="text-sm text-gray-500">
                Delivery Fee: $2.99
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Menu</h2>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        {filteredMenu.length === 0 ? (
          <EmptyState
            title="No items found"
            description="No menu items available in this category."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMenu.map((item) => (
              <FoodItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetails;