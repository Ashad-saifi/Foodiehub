import express from 'express';
import jwt from 'jsonwebtoken';
import Order from '../models/Order.js';

const router = express.Router();

// Auth middleware
const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// POST /api/orders — place a new order
router.post('/', auth, async (req, res) => {
  try {
    const { items, subtotal, deliveryFee, tax, total, address, city, zipCode, phone, paymentMethod } = req.body;

    const orderId = `FH${Date.now().toString().slice(-6)}`;

    const order = await Order.create({
      userId: req.userId,
      orderId,
      items,
      subtotal,
      deliveryFee,
      tax,
      total,
      address,
      city,
      zipCode,
      phone,
      paymentMethod,
      status: 'placed',
    });

    res.status(201).json({
      message: 'Order placed successfully',
      order: {
        orderId: order.orderId,
        items: order.items,
        total: order.total,
        status: order.status,
        address: `${order.address}, ${order.city} ${order.zipCode}`,
        paymentMethod: order.paymentMethod === 'card' ? 'Credit/Debit Card' : 'Cash on Delivery',
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to place order' });
  }
});

// GET /api/orders — get all orders for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

// GET /api/orders/:orderId — get a specific order
router.get('/:orderId', auth, async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId, userId: req.userId });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ order });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch order' });
  }
});

// PATCH /api/orders/:id/status — update order status
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ['placed', 'confirmed', 'preparing', 'out-for-delivery', 'delivered', 'cancelled'];
    
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    // In a real app, you'd check if user is admin. Here we allow the user to simulate it.
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ message: 'Status updated', order });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update status' });
  }
});

export default router;
