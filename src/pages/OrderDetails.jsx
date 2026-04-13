import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaMapMarkerAlt, FaPhone, FaShoppingBag, FaClock } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { fetchOrderDetails } from '../services/api';
import Loader from '../components/Loader';

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const data = await fetchOrderDetails(id);
        setOrder(data.order);
      } catch (error) {
        toast.error('Failed to load order details');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [id, navigate]);

  if (loading) return <Loader />;

  if (!order) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/dashboard" className="inline-flex items-center text-orange-500 hover:text-orange-600 mb-6 font-medium">
        <FaArrowLeft className="mr-2" /> Back to Dashboard
      </Link>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Order #{order.orderId}</h1>
            <p className="text-gray-600">Placed on {new Date(order.createdAt).toLocaleString()}</p>
          </div>
          <div>
            <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase ${
              order.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {order.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Items Section */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <FaShoppingBag className="mr-2 text-orange-500" /> Items Ordered
            </h2>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Payment Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-orange-500" /> Delivery Address
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-800">{order.address}</p>
                <p className="text-gray-800">{order.city}, {order.zipCode}</p>
                <p className="text-gray-600 mt-2 flex items-center">
                  <FaPhone className="mr-2 text-xs" /> {order.phone}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <FaClock className="mr-2 text-orange-500" /> Payment Info
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-800 capitalize">Method: {order.paymentMethod}</p>
                <p className="text-green-600 font-medium">Status: Paid</p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Footer */}
        <div className="p-6 bg-gray-50 border-t border-gray-100 mt-4">
          <div className="max-w-xs ml-auto space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-green-600 font-medium">
                <span>Discount</span>
                <span>-${order.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-gray-600">
              <span>Delivery Fee</span>
              <span>${order.deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax</span>
              <span>${order.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-200">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Link to="/order-tracking" state={{ order }} className="bg-orange-500 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition-all transform hover:scale-105 shadow-lg">
          Track Live Delivery
        </Link>
      </div>
    </div>
  );
};

export default OrderDetails;
