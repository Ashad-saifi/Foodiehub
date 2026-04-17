import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  orderId: {
    type: String,
    unique: true,
    required: true,
  },
  items: [{
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String },
  }],
  subtotal: { type: Number, required: true },
  deliveryFee: { type: Number, default: 2.99 },
  tax: { type: Number, required: true },
  total: { type: Number, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  zipCode: { type: String, required: true },
  phone: { type: String, required: true },
  paymentMethod: {
    type: String,
    enum: ['card', 'cash'],
    default: 'cash',
  },
  status: {
    type: String,
    enum: ['placed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'],
    default: 'placed',
  },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
