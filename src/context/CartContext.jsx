import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useUser } from './UserContext';
import { 
  fetchUserCart, 
  updateCartApi, 
  removeCartItemApi, 
  updateCartItemQuantityApi, 
  clearUserCartApi 
} from '../services/api';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return { ...state, items: action.payload };
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + (action.payload.addedQuantity || 1) }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }],
      };
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
};

// Load cart from localStorage on startup
const loadCartFromStorage = () => {
  try {
    const saved = localStorage.getItem('foodiehub_cart');
    if (saved) return { items: JSON.parse(saved) };
  } catch (e) {
    console.error('Failed to load cart from storage:', e);
  }
  return { items: [] };
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadCartFromStorage);
  const { isLoggedIn } = useUser();

  // Load from backend on login
  useEffect(() => {
    if (isLoggedIn) {
      const loadInitialCart = async () => {
        try {
          const cartData = await fetchUserCart();
          if (cartData && cartData.items) {
            dispatch({ type: 'SET_CART', payload: cartData.items });
          }
        } catch (error) {
          console.error('Failed to fetch remote cart:', error);
        }
      };
      loadInitialCart();
    }
  }, [isLoggedIn]);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('foodiehub_cart', JSON.stringify(state.items));
    } catch (e) {
      console.error('Failed to save cart to storage:', e);
    }
  }, [state.items]);

  const addToCart = async (item) => {
    const addedQuantity = item.quantity || 1;
    // optimistic update
    dispatch({ type: 'ADD_TO_CART', payload: { ...item, addedQuantity } });
    if (isLoggedIn) {
      try {
        await updateCartApi({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: addedQuantity,
          image: item.image
        });
      } catch (error) {
        console.error('Failed to sync add to cart with backend:', error);
      }
    }
  };

  const removeFromCart = async (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    if (isLoggedIn) {
      try {
        await removeCartItemApi(id);
      } catch (error) {
        console.error('Failed to sync remove from cart with backend:', error);
      }
    }
  };

  const updateQuantity = async (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
      if (isLoggedIn) {
        try {
          await updateCartItemQuantityApi(id, quantity);
        } catch (error) {
          console.error('Failed to sync update cart with backend:', error);
        }
      }
    }
  };

  const clearCart = async () => {
    dispatch({ type: 'CLEAR_CART' });
    if (isLoggedIn) {
      try {
        await clearUserCartApi();
      } catch (error) {
        console.error('Failed to sync clear cart with backend:', error);
      }
    }
  };

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};