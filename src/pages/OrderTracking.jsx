import React, { useState, useEffect } from 'react';
import { FaCheck, FaClock, FaTruck, FaBoxOpen } from 'react-icons/fa';

const OrderTracking = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      id: 1,
      title: 'Order Placed',
      description: 'Your order has been confirmed',
      icon: FaCheck,
      time: '2:30 PM',
    },
    {
      id: 2,
      title: 'Preparing',
      description: 'Restaurant is preparing your food',
      icon: FaBoxOpen,
      time: '2:45 PM',
    },
    {
      id: 3,
      title: 'Out for Delivery',
      description: 'Your order is on the way',
      icon: FaTruck,
      time: '3:15 PM',
    },
    {
      id: 4,
      title: 'Delivered',
      description: 'Enjoy your meal!',
      icon: FaCheck,
      time: '3:30 PM',
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
    }, 3000); // Change step every 3 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Tracking</h1>
        <p className="text-gray-600">Order #12345</p>
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

        {/* Order Details */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Order Details</h3>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Estimated Delivery</span>
              <span className="font-medium">3:30 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Address</span>
              <span className="font-medium">123 Main St, City, ST 12345</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method</span>
              <span className="font-medium">Cash on Delivery</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-lg font-bold text-orange-500">$32.47</span>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-6 pt-6 border-t text-center">
          <p className="text-gray-600 mb-4">Need help with your order?</p>
          <button className="bg-orange-500 text-white px-6 py-2 rounded-full font-medium hover:bg-orange-600 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;