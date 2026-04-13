import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String },
  category: { type: String },
});

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cuisine: { type: String, required: true },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  priceRange: { type: String, default: '$$' },
  distance: { type: String },
  image: { type: String, required: true },
  deliveryTime: { type: String },
  isOpen: { type: Boolean, default: true },
  description: { type: String },
  menu: [menuItemSchema],
}, { timestamps: true });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
export default Restaurant;
