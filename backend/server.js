import express from "express"; // ✅ ADD THIS
import mongoose from "mongoose";
import dotenv from "dotenv";
import restaurantRoutes from "./routes/restaurantRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/restaurants", restaurantRoutes);

// CONNECT DATABASE
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});