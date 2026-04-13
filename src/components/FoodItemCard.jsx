import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const FoodItemCard = ({ item }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-32 object-cover"
      />

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-orange-500">${item.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors"
          >
            <FaPlus className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodItemCard;