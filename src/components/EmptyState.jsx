import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const EmptyState = ({ title, description, icon: Icon = FaShoppingCart }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <Icon className="text-gray-300 text-6xl mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 text-center max-w-md">{description}</p>
    </div>
  );
};

export default EmptyState;