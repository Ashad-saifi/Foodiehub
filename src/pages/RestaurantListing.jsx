import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import RestaurantCard from '../components/RestaurantCard';
import FilterBar from '../components/FilterBar';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import { fetchRestaurants } from '../services/api';

const RestaurantListing = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    const loadRestaurants = async () => {
      setLoading(true);
      try {
        const data = await fetchRestaurants(searchQuery);
        setRestaurants(data);
        setFilteredRestaurants(data);
      } catch (error) {
        console.error('Error loading restaurants:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRestaurants();
  }, [searchQuery]);

  const handleFilterChange = (filters) => {
    let filtered = restaurants;

    // Apply filters
    if (filters.rating) {
      filtered = filtered.filter(restaurant => restaurant.rating >= parseFloat(filters.rating));
    }

    if (filters.cuisine && filters.cuisine !== 'All') {
      filtered = filtered.filter(restaurant => restaurant.cuisine === filters.cuisine);
    }

    if (filters.price) {
      filtered = filtered.filter(restaurant => restaurant.priceRange === filters.price);
    }

    if (filters.distance) {
      const distanceMap = {
        '< 1km': (dist) => parseFloat(dist) < 1,
        '1-2km': (dist) => parseFloat(dist) >= 1 && parseFloat(dist) < 2,
        '2-3km': (dist) => parseFloat(dist) >= 2 && parseFloat(dist) < 3,
        '> 3km': (dist) => parseFloat(dist) >= 3,
      };

      if (distanceMap[filters.distance]) {
        filtered = filtered.filter(restaurant =>
          distanceMap[filters.distance](restaurant.distance)
        );
      }
    }

    setFilteredRestaurants(filtered);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {searchQuery ? `Search results for "${searchQuery}"` : 'All Restaurants'}
        </h1>
        <p className="text-gray-600">
          {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? 's' : ''} found
        </p>
      </div>

      <FilterBar onFilterChange={handleFilterChange} />

      {filteredRestaurants.length === 0 ? (
        <EmptyState
          title="No restaurants found"
          description="Try adjusting your filters or search for something else."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantListing;