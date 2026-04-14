import express from "express";
import { getRestaurants } from "../controllers/restaurantController.js";

const router = express.Router();

router.get("/", getRestaurants);
console.log(getRestaurants);

export default router;