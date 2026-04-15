import express from 'express';
import Cart from '../models/Cart.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware to authenticate user
const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Authentication required' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// GET /api/cart - Get user's cart
router.get('/', auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [] });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart' });
  }
});

// POST /api/cart - Add/update item in cart
router.post('/', auth, async (req, res) => {
  try {
    const { id, name, price, quantity, image } = req.body;
    let cart = await Cart.findOne({ user: req.user.id });
    
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(item => item.id === id);
    
    if (existingItemIndex > -1) {
      // Update quantity
      cart.items[existingItemIndex].quantity += quantity;
      // If quantity becomes <= 0, remove item
      if (cart.items[existingItemIndex].quantity <= 0) {
        cart.items.splice(existingItemIndex, 1);
      }
    } else if (quantity > 0) {
      // Add new item
      cart.items.push({ id, name, price, quantity, image });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart' });
  }
});

// PUT /api/cart/:id - Update item quantity specifically
router.put('/:id', auth, async (req, res) => {
  try {
    const { quantity } = req.body;
    const { id } = req.params;
    
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const existingItemIndex = cart.items.findIndex(item => item.id === id);
    if (existingItemIndex > -1) {
      if (quantity <= 0) {
        cart.items.splice(existingItemIndex, 1);
      } else {
        cart.items[existingItemIndex].quantity = quantity;
      }
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart item' });
  }
});

// DELETE /api/cart/:id - Remove item entirely
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(item => item.id !== id);
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from cart' });
  }
});

// DELETE /api/cart - Clear entire cart
router.delete('/', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    res.json({ message: 'Cart cleared', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error clearing cart' });
  }
});

export default router;
