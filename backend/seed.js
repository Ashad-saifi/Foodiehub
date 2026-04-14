import mongoose from "mongoose";
import dotenv from "dotenv";
import Restaurant from "./models/Restaurant.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const seedData = async () => {
  await Restaurant.deleteMany();

  await Restaurant.insertMany([
    { name: "Pizza Hub", cuisine: "Italian", rating: 4.5 },
    { name: "Burger King", cuisine: "Fast Food", rating: 4.2 }
  ]);

  console.log("Data inserted");
  process.exit();
};

seedData();