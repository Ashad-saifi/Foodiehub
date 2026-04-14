import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: String,
  cuisine: String,
  rating: Number,
  deliveryTime: String,
  priceRange: String
});
const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
