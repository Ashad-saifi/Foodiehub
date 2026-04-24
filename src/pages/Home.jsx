import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaStar } from 'react-icons/fa';
import RestaurantCard from '../components/RestaurantCard';
import Loader from '../components/Loader';
import { fetchRestaurants, fetchCategories, fetchOffers } from '../services/api';

const Home = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchRestaurants();
      setRestaurants(data);
    };

    fetchData();
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
    <div>
      <h1>Restaurants</h1>
      {restaurants.map((r, index) => (
        <p key={index}>{r.name}</p>
      ))}
    </div>
  );
};

export default Home;