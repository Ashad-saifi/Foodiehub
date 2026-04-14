import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/register", (req, res) => {
  console.log("REGISTER HIT");
  res.send("Working");
});

export default router;