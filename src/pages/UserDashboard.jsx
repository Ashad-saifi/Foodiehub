import React, { useState } from 'react';
import { FaUser, FaMapMarkerAlt, FaPhone, FaEnvelope, FaShoppingBag, FaStar } from 'react-icons/fa';
import { useUser } from '../context/UserContext';

const UserDashboard = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('profile');

  // Mock order history
  const orderHistory = [
    {
      id: 1,
      restaurant: 'Pizza Palace',
      items: ['Margherita Pizza', 'Pepperoni Pizza'],
      total: 27.98,
      status: 'Delivered',
      date: '2024-01-15',
      rating: 5,
    },
    {
      id: 2,
      restaurant: 'Burger Joint',
      items: ['Classic Burger', 'Fries'],
      total: 15.99,
      status: 'Delivered',
      date: '2024-01-12',
      rating: 4,
    },
    {
      id: 3,
      restaurant: 'Sushi Express',
      items: ['California Roll', 'Miso Soup'],
      total: 22.50,
      status: 'Delivered',
      date: '2024-01-10',
      rating: 5,
    },
  ];

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="flex items-center p-3 bg-gray-50 rounded-md">
                  <FaUser className="text-gray-400 mr-3" />
                  <span>{user?.name || 'John Doe'}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="flex items-center p-3 bg-gray-50 rounded-md">
                  <FaEnvelope className="text-gray-400 mr-3" />
                  <span>{user?.email || 'john@example.com'}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="flex items-center p-3 bg-gray-50 rounded-md">
                  <FaPhone className="text-gray-400 mr-3" />
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Address
                </label>
                <div className="flex items-center p-3 bg-gray-50 rounded-md">
                  <FaMapMarkerAlt className="text-gray-400 mr-3" />
                  <span>123 Main St, City, ST 12345</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t">
              <button className="bg-orange-500 text-white px-6 py-2 rounded-full font-medium hover:bg-orange-600 transition-colors">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Order History</h2>

          {orderHistory.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <FaShoppingBag className="text-4xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
              <p className="text-gray-600">Your order history will appear here once you place your first order.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orderHistory.map((order) => (
                <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{order.restaurant}</h3>
                      <p className="text-sm text-gray-600">{order.date}</p>
                    </div>
                    <div className="mt-2 md:mt-0 text-right">
                      <p className="text-lg font-bold text-orange-500">${order.total.toFixed(2)}</p>
                      <div className="flex items-center mt-1">
                        <FaStar className="text-yellow-400 mr-1" />
                        <span className="text-sm text-gray-600">{order.rating}/5</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Items:</p>
                    <ul className="text-sm text-gray-800">
                      {order.items.map((item, index) => (
                        <li key={index} className="inline mr-4">• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === 'Delivered'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                    <button className="text-orange-500 hover:text-orange-600 text-sm font-medium">
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