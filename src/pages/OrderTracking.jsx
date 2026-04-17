import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaCheck, FaClock, FaTruck, FaBoxOpen } from 'react-icons/fa';

const OrderTracking = () => {
  const location = useLocation();
  const order = location.state?.order || null;
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      id: 1,
      title: 'Order Placed',
      description: 'Your order has been confirmed',
      icon: FaCheck,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
    {
      id: 2,
      title: 'Preparing',
      description: 'Restaurant is preparing your food',
      icon: FaBoxOpen,
      time: new Date(Date.now() + 15 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
    {
      id: 3,
      title: 'Out for Delivery',
      description: 'Your order is on the way',
      icon: FaTruck,
      time: new Date(Date.now() + 35 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
    {
      id: 4,
      title: 'Delivered',
      description: 'Enjoy your meal!',
      icon: FaCheck,
      time: new Date(Date.now() + 50 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ];

  useEffect(() => {
    // Simulate order progress
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // Fallback if no order data is available
  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="text-6xl mb-6">📦</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">No Active Order</h1>
        <p className="text-gray-500 mb-8">
          You don't have any active orders to track. Place an order to see it here!
        </p>
        <Link
          to="/restaurants"
          className="bg-orange-500 text-white px-8 py-3 rounded-full font-medium hover:bg-orange-600 transition-colors"
        >
          Browse Restaurants
        </Link>
      </div>
    );
  }

  const estimatedDelivery = new Date(Date.now() + 50 * 60000).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Tracking</h1>
        <p className="text-gray-600">Order #{order.orderId}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Progress Bar */}
        <div className="relative mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = index <= currentStep;
              const isCurrent = index === currentStep;

              return (
                <div key={step.id} className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors ${
                      isCompleted
                        ? 'bg-green-500 text-white'
                        : isCurrent
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    <Icon className="text-lg" />
                  </div>
                  <div className="text-center">
                    <p className={`text-sm font-medium ${isCompleted ? 'text-green-600' : 'text-gray-500'}`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{step.time}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress Line */}
          <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-200 -z-10">
            <div
              className="h-full bg-green-500 transition-all duration-1000 ease-in-out"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Current Status */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {steps[currentStep].title}
          </h2>
          <p className="text-gray-600">{steps[currentStep].description}</p>
        </div>

        {/* Order Details — now real data */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Order Details</h3>

          {/* Order items */}
          {order.items && order.items.length > 0 && (
            <div className="space-y-2 mb-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-3 border-t pt-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Estimated Delivery</span>
              <span className="font-medium">{estimatedDelivery}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Address</span>
              <span className="font-medium text-right max-w-[200px]">{order.address}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method</span>
              <span className="font-medium">{order.paymentMethod}</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-lg font-bold text-orange-500">${order.total}</span>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-6 pt-6 border-t text-center">
          <p className="text-gray-600 mb-4">Need help with your order?</p>
          <a
            href="mailto:support@foodiehub.com"
            className="bg-orange-500 text-white px-6 py-2 rounded-full font-medium hover:bg-orange-600 transition-colors inline-block"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;