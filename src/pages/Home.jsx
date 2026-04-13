import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaStar } from 'react-icons/fa';
import RestaurantCard from '../components/RestaurantCard';
import Loader from '../components/Loader';
import { fetchRestaurants, fetchCategories, fetchOffers } from '../services/api';

const Home = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [restaurantsData, categoriesData, offersData] = await Promise.all([
          fetchRestaurants(),
          fetchCategories(),
          fetchOffers(),
        ]);
        setRestaurants(restaurantsData);
        setCategories(categoriesData);
        setOffers(offersData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/restaurants?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200')"
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Delicious Food,<br />
              <span className="text-yellow-300">Delivered Fast</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              Order from your favorite restaurants and get it delivered to your doorstep in minutes.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-md mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your delivery address"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-12 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 bg-orange-600 text-white p-2 rounded-full hover:bg-orange-700 transition-colors"
                >
                  <FaSearch />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Explore Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to="/restaurants"
                className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors text-center"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600">{category.count} restaurants</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Restaurants</h2>
            <Link
              to="/restaurants"
              className="text-orange-500 hover:text-orange-600 font-medium"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {restaurants.slice(0, 4).map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Offers */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Trending Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="bg-gradient-to-r from-orange-400 to-red-500 rounded-lg p-6 text-white relative overflow-hidden"
              >
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-2">{offer.title}</h3>
                  <p className="text-orange-100 mb-4">{offer.description}</p>
                  <button className="bg-white text-orange-500 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
                    Order Now
                  </button>
                </div>
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-20"
                  style={{ backgroundImage: `url(${offer.image})` }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;