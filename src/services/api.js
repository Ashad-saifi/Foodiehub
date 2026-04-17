import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Helper to map _id to id
const mapId = (data) => {
  if (Array.isArray(data)) {
    return data.map(item => ({ ...item, id: item._id }));
  }
  if (data && data._id) {
    return { ...data, id: data._id };
  }
  return data;
};

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('foodiehub_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Transform responses
api.interceptors.response.use((response) => {
  response.data = mapId(response.data);
  return response;
});

export const fetchRestaurants = async (search = '', cuisine = '') => {
  try {
    const response = await api.get('/restaurants', {
      params: { search, cuisine }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return [];
  }
};

export const fetchRestaurantDetails = async (id) => {
  try {
    const response = await api.get(`/restaurants/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching restaurant details:', error);
    return null;
  }
};

export const fetchCategories = async () => {
  // Keeping categories mock for now as they are static UI elements mostly
  return [
    { id: 1, name: 'Delivery', icon: '🚚', count: 1200 },
    { id: 2, name: 'Dining Out', icon: '🍽️', count: 850 },
    { id: 3, name: 'Nightlife', icon: '🍸', count: 320 },
  ];
};

export const fetchOffers = async () => {
  return [
    {
      id: 1,
      title: '50% Off on First Order',
      description: 'Use code FIRST50',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400',
    },
    {
      id: 2,
      title: 'Free Delivery',
      description: 'On orders above $25',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
    },
  ];
};

// Auth APIs
export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const getMe = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

// Order APIs
export const placeOrder = async (orderData) => {
  const response = await api.post('/orders', orderData);
  return response.data;
};

export const fetchUserOrders = async () => {
  const response = await api.get('/orders');
  return response.data;
};

export const fetchOrderDetails = async (orderId) => {
  const response = await api.get(`/orders/${orderId}`);
  return response.data;
};

export default api;
import axios from "axios";

const API = "http://localhost:5000/api";

export const getRestaurants = async () => {
  const res = await axios.get(`${API}/restaurants`);
  return res.data;
};// Mock API service using dummy data

export const fetchRestaurants = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    {
      id: 1,
      name: 'Pizza Palace',
      cuisine: 'Italian',
      rating: 4.5,
      reviews: 1200,
      priceRange: '$$',
      distance: '2.5 km',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
      deliveryTime: '30-40 min',
      isOpen: true,
    },
    {
      id: 2,
      name: 'Burger Joint',
      cuisine: 'American',
      rating: 4.2,
      reviews: 850,
      priceRange: '$',
      distance: '1.8 km',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
      deliveryTime: '20-30 min',
      isOpen: true,
    },
    {
      id: 3,
      name: 'Sushi Express',
      cuisine: 'Japanese',
      rating: 4.7,
      reviews: 650,
      priceRange: '$$$',
      distance: '3.2 km',
      image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400',
      deliveryTime: '25-35 min',
      isOpen: true,
    },
    {
      id: 4,
      name: 'Taco Fiesta',
      cuisine: 'Mexican',
      rating: 4.3,
      reviews: 920,
      priceRange: '$$',
      distance: '1.5 km',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
      deliveryTime: '15-25 min',
      isOpen: false,
    },
  ];
};

export const fetchRestaurantDetails = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const restaurants = await fetchRestaurants();
  const restaurant = restaurants.find(r => r.id === parseInt(id));
  if (!restaurant) return null;

  return {
    ...restaurant,
    description: 'A wonderful place to enjoy delicious food with family and friends.',
    menu: [
      {
        id: 1,
        name: 'Margherita Pizza',
        price: 12.99,
        description: 'Fresh tomatoes, mozzarella, basil',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300',
        category: 'Pizza',
      },
      {
        id: 2,
        name: 'Pepperoni Pizza',
        price: 15.99,
        description: 'Pepperoni, cheese, tomato sauce',
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300',
        category: 'Pizza',
      },
      {
        id: 3,
        name: 'Caesar Salad',
        price: 8.99,
        description: 'Romaine lettuce, croutons, parmesan',
        image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300',
        category: 'Salads',
      },
    ],
  };
};

export const fetchCategories = async () => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return [
    { id: 1, name: 'Delivery', icon: '🚚', count: 1200 },
    { id: 2, name: 'Dining Out', icon: '🍽️', count: 850 },
    { id: 3, name: 'Nightlife', icon: '🍸', count: 320 },
  ];
};

export const fetchOffers = async () => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return [
    {
      id: 1,
      title: '50% Off on First Order',
      description: 'Use code FIRST50',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400',
    },
    {
      id: 2,
      title: 'Free Delivery',
      description: 'On orders above $25',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
    },
  ];
};
