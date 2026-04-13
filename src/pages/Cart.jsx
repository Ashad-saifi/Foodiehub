import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaMinus, FaTrash, FaShoppingCart } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import EmptyState from '../components/EmptyState';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EmptyState
          title="Your cart is empty"
          description="Add some delicious food to your cart and come back here to checkout."
          icon={FaShoppingCart}
        />
        <div className="text-center mt-8">
          <Link
            to="/restaurants"
            className="bg-orange-500 text-white px-6 py-3 rounded-full font-medium hover:bg-orange-600 transition-colors"
          >
            Browse Restaurants
          </Link>
        </div>
      </div>
    );
  }

  const deliveryFee = 2.99;
  const tax = getTotalPrice() * 0.08; // 8% tax
  const total = getTotalPrice() + deliveryFee + tax;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)} each</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <FaMinus className="text-sm" />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <FaPlus className="text-sm" />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-600 mt-1"
                    >
                      <FaTrash className="text-sm" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={() => {
                clearCart();
                toast.success('Cart cleared');
              }}
              className="text-red-500 hover:text-red-600 font-medium"
            >
              Clear Cart
            </button>
            <Link
              to="/restaurants"
              className="text-orange-500 hover:text-orange-600 font-medium"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-600 transition-colors text-center block"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;