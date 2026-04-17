import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import orderRoutes from './routes/orders.js';
import restaurantRoutes from './routes/restaurants.js';

dotenv.config();

const app = express();

// ─── Middleware ───────────────────────────────────
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));

// ─── Routes ──────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/restaurants', restaurantRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'FoodieHub API is running 🚀' });
});

// ─── 404 handler ─────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});
app.use(express.json());

app.use("/api/restaurants", restaurantRoutes);
app.use("/api/users", userRoutes);


// CONNECT DATABASE
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

// ─── Error handler ───────────────────────────────
app.use((err, req, res, next) => {
  console.error('Server error:', err.message);
  res.status(500).json({ message: 'Internal server error' });
});

// ─── Database & Server ───────────────────────────
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(PORT, () => {
      console.log(`🔥 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ DB Error:', err.message);
    process.exit(1);
  });
app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
  console.log("User routes loaded");

});
