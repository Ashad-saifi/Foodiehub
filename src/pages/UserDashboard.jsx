import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaMapMarkerAlt, FaPhone, FaEnvelope, FaShoppingBag, FaStar, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { OrderSkeleton } from '../components/Skeleton';
import { useUser } from '../context/UserContext';
import { fetchUserOrders, updateProfile } from '../services/api';

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john@example.com',
    phone: user?.phone || '+1 (555) 123-4567',
    address: user?.address || '123 Main St, City, ST 12345',
  });

  useEffect(() => {
    if (activeTab === 'orders') {
      loadOrders();
    }
  }, [activeTab]);

  useEffect(() => {
    if (user && !isEditing) {
      setEditForm({
        name: user.name || 'John Doe',
        email: user.email || 'john@example.com',
        phone: user.phone || '+1 (555) 123-4567',
        address: user.address || '123 Main St, City, ST 12345',
      });
    }
  }, [user, isEditing]);

  const loadOrders = async () => {
    setLoadingOrders(true);
    try {
      const data = await fetchUserOrders();
      setOrders(data.orders);
    } catch (error) {
      toast.error('Failed to load order history');
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await updateProfile(editForm);
      setUser(data.user);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: FaUser },
    { id: 'orders', label: 'Order History', icon: FaShoppingBag },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>

      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="text-lg" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>

          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
                <FaUser className="text-3xl text-orange-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{user?.name || 'John Doe'}</h3>
                <p className="text-gray-600">Member since January 2024</p>
              </div>
            </div>

            {isEditing ? (
              <form onSubmit={handleEditSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <div className="flex items-center bg-white border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
                    <div className="pl-3 py-3"><FaUser className="text-gray-400" /></div>
                    <input 
                       type="text" 
                       value={editForm.name} 
                       onChange={e => setEditForm({...editForm, name: e.target.value})} 
                       className="w-full p-3 outline-none" 
                       required 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <div className="flex items-center bg-white border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
                    <div className="pl-3 py-3"><FaEnvelope className="text-gray-400" /></div>
                    <input 
                       type="email" 
                       value={editForm.email} 
                       onChange={e => setEditForm({...editForm, email: e.target.value})} 
                       className="w-full p-3 outline-none" 
                       required 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <div className="flex items-center bg-white border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
                    <div className="pl-3 py-3"><FaPhone className="text-gray-400" /></div>
                    <input 
                       type="tel" 
                       value={editForm.phone} 
                       onChange={e => setEditForm({...editForm, phone: e.target.value})} 
                       className="w-full p-3 outline-none" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Default Address</label>
                  <div className="flex items-center bg-white border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
                    <div className="pl-3 py-3"><FaMapMarkerAlt className="text-gray-400" /></div>
                    <input 
                       type="text" 
                       value={editForm.address} 
                       onChange={e => setEditForm({...editForm, address: e.target.value})} 
                       className="w-full p-3 outline-none" 
                    />
                  </div>
                </div>

                <div className="md:col-span-2 pt-6 border-t flex gap-4">
                  <button type="submit" className="bg-orange-500 text-white px-6 py-2 rounded-full font-medium flex items-center hover:bg-orange-600 transition-colors">
                    <FaSave className="mr-2" /> Save Changes
                  </button>
                  <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-100 text-gray-700 px-6 py-2 rounded-full font-medium flex items-center hover:bg-gray-200 transition-colors">
                    <FaTimes className="mr-2" /> Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="flex items-center p-3 bg-gray-50 rounded-md">
                      <FaUser className="text-gray-400 mr-3" />
                      <span>{editForm.name}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="flex items-center p-3 bg-gray-50 rounded-md">
                      <FaEnvelope className="text-gray-400 mr-3" />
                      <span>{editForm.email}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="flex items-center p-3 bg-gray-50 rounded-md">
                      <FaPhone className="text-gray-400 mr-3" />
                      <span>{editForm.phone}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Default Address
                    </label>
                    <div className="flex items-center p-3 bg-gray-50 rounded-md">
                      <FaMapMarkerAlt className="text-gray-400 mr-3" />
                      <span>{editForm.address}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <button onClick={() => setIsEditing(true)} className="bg-orange-500 text-white px-6 py-2 rounded-full font-medium flex items-center hover:bg-orange-600 transition-colors">
                    <FaEdit className="mr-2" /> Edit Profile
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Order History</h2>

          {loadingOrders ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <OrderSkeleton key={i} />
              ))}
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <FaShoppingBag className="text-4xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
              <p className="text-gray-600">Your order history will appear here once you place your first order.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Order #{order.orderId}</h3>
                      <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="mt-2 md:mt-0 text-right">
                      <p className="text-lg font-bold text-orange-500">${order.total.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Items:</p>
                    <ul className="text-sm text-gray-800">
                      {order.items.map((item, index) => (
                        <li key={index} className="inline mr-4">• {item.name} (x{item.quantity})</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === 'delivered'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <button 
                       onClick={() => navigate(`/orders/${order.id}`)}
                       className="text-orange-500 hover:text-orange-600 text-sm font-medium"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;