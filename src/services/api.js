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

export const updateProfile = async (userData) => {
  const response = await api.put('/auth/profile', userData);
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

export const updateOrderStatus = async (id, status) => {
  const response = await api.patch(`/orders/${id}/status`, { status });
  return response.data;
};

// Cart APIs
export const fetchUserCart = async () => {
  const response = await api.get('/cart');
  return response.data;
};

export const updateCartApi = async (itemData) => {
  const response = await api.post('/cart', itemData);
  return response.data;
};

export const removeCartItemApi = async (id) => {
  const response = await api.delete(`/cart/${id}`);
  return response.data;
};

export const updateCartItemQuantityApi = async (id, quantity) => {
  const response = await api.put(`/cart/${id}`, { quantity });
  return response.data;
};

export const clearUserCartApi = async () => {
  const response = await api.delete('/cart');
  return response.data;
};

export default api;