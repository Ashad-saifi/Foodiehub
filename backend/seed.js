import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Restaurant from './models/Restaurant.js';

dotenv.config();

const restaurants = [
  {
    name: 'Pizza Palace',
    cuisine: 'Italian',
    rating: 4.5,
    reviews: 1200,
    priceRange: '$$',
    distance: '2.5 km',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
    deliveryTime: '30-40 min',
    isOpen: true,
    description: 'Authentic Italian pizzeria with wood-fired oven and handmade dough since 1995.',
    menu: [
      { name: 'Margherita Pizza', price: 12.99, description: 'Fresh tomatoes, mozzarella, basil', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300', category: 'Pizza' },
      { name: 'Pepperoni Pizza', price: 15.99, description: 'Pepperoni, cheese, tomato sauce', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300', category: 'Pizza' },
      { name: 'Caesar Salad', price: 8.99, description: 'Romaine lettuce, croutons, parmesan', image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300', category: 'Salads' },
      { name: 'BBQ Chicken Pizza', price: 17.99, description: 'BBQ sauce, chicken, red onion, cilantro', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae78?w=300', category: 'Pizza' },
      { name: 'Garlic Bread', price: 5.99, description: 'Crispy garlic bread with herbs and butter', image: 'https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?w=300', category: 'Sides' },
      { name: 'Tiramisu', price: 7.99, description: 'Classic Italian coffee-flavored dessert', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300', category: 'Desserts' },
    ]
  },
  {
    name: 'Burger Joint',
    cuisine: 'American',
    rating: 4.2,
    reviews: 850,
    priceRange: '$',
    distance: '1.8 km',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
    deliveryTime: '20-30 min',
    isOpen: true,
    description: 'Classic American burgers made with 100% Angus beef and fresh local ingredients.',
    menu: [
      { name: 'Classic Burger', price: 10.99, description: 'Beef patty, lettuce, tomato, pickles', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300', category: 'Burgers' },
      { name: 'Cheese Burger', price: 12.49, description: 'Double cheese, caramelized onions', image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=300', category: 'Burgers' },
      { name: 'Crispy Fries', price: 4.99, description: 'Golden crispy french fries with seasoning', image: 'https://images.unsplash.com/photo-1630384060421-cb20aeb68713?w=300', category: 'Sides' },
      { name: 'Chicken Wings', price: 9.99, description: 'Spicy buffalo wings with ranch dip', image: 'https://images.unsplash.com/photo-1608039829572-9b1234ef1321?w=300', category: 'Sides' },
      { name: 'Milkshake', price: 6.99, description: 'Thick vanilla milkshake with whipped cream', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300', category: 'Drinks' },
      { name: 'Bacon Burger', price: 14.99, description: 'Smoky bacon, cheddar, BBQ sauce', image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=300', category: 'Burgers' },
    ]
  },
  {
    name: 'Sushi Express',
    cuisine: 'Japanese',
    rating: 4.7,
    reviews: 650,
    priceRange: '$$$',
    distance: '3.2 km',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400',
    deliveryTime: '25-35 min',
    isOpen: true,
    description: 'Premium Japanese cuisine with fresh fish flown in daily from Tsukiji Market.',
    menu: [
      { name: 'California Roll', price: 11.99, description: 'Crab, avocado, cucumber, sesame', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300', category: 'Sushi' },
      { name: 'Salmon Sashimi', price: 16.99, description: 'Fresh sliced salmon, 8 pieces', image: 'https://images.unsplash.com/photo-1534256958597-7fe685cbd745?w=300', category: 'Sushi' },
      { name: 'Miso Soup', price: 4.99, description: 'Traditional miso with tofu and seaweed', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300', category: 'Soups' },
      { name: 'Tempura Shrimp', price: 13.99, description: 'Crispy battered shrimp with dipping sauce', image: 'https://images.unsplash.com/photo-1615361200141-f45040f367be?w=300', category: 'Appetizers' },
      { name: 'Ramen Bowl', price: 14.99, description: 'Rich tonkotsu broth, chashu, soft-boiled egg', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300', category: 'Soups' },
      { name: 'Green Tea Ice Cream', price: 5.99, description: 'Matcha flavored ice cream, 2 scoops', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300', category: 'Desserts' },
    ]
  },
  {
    name: 'Taco Fiesta',
    cuisine: 'Mexican',
    rating: 4.3,
    reviews: 920,
    priceRange: '$$',
    distance: '1.5 km',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
    deliveryTime: '15-25 min',
    isOpen: false,
    description: 'Vibrant Mexican street food with bold flavors and family recipes passed down generations.',
    menu: [
      { name: 'Chicken Tacos', price: 9.99, description: 'Grilled chicken, salsa, cilantro, lime', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300', category: 'Tacos' },
      { name: 'Beef Burrito', price: 11.99, description: 'Seasoned beef, rice, beans, cheese, sour cream', image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300', category: 'Burritos' },
      { name: 'Guacamole & Chips', price: 6.99, description: 'Fresh avocado dip with crispy tortilla chips', image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=300', category: 'Appetizers' },
      { name: 'Quesadilla', price: 8.99, description: 'Cheese, peppers, onions in a grilled tortilla', image: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=300', category: 'Sides' },
      { name: 'Churros', price: 5.99, description: 'Cinnamon sugar churros with chocolate sauce', image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=300', category: 'Desserts' },
      { name: 'Horchata', price: 3.99, description: 'Sweet cinnamon rice milk drink', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300', category: 'Drinks' },
    ]
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    await Restaurant.deleteMany({});
    console.log('Cleared existing restaurants.');

    await Restaurant.insertMany(restaurants);
    console.log('Successfully seeded restaurants!');

    process.exit();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDB();
