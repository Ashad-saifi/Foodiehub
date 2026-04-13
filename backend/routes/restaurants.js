import express from 'express';
import Restaurant from '../models/Restaurant.js';

const router = express.Router();

// GET /api/restaurants - Get all restaurants (with optional search filter)
router.get('/', async (req, res) => {
  try {
    const { search, cuisine } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { cuisine: { $regex: search, $options: 'i' } }
      ];
    }

    if (cuisine && cuisine !== 'All') {
      query.cuisine = cuisine;
    }

    const restaurants = await Restaurant.find(query);
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching restaurants' });
  }
});

// GET /api/restaurants/:id - Get a specific restaurant details
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json(restaurant);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.status(500).json({ message: 'Error fetching restaurant details' });
  }
});

export default router;
