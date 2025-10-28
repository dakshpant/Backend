import express from "express";
import User from "../models/user.model.js";
import userController from "../controllers/user.controller.js";
import { verifyToken,  } from "../helpers/jwt.js";

const route = express.Router();


// Web Routes

// Home (Public)
route.get("/",(req, res) => {
  try {
    res.status(200).render("logIn", { title: "Login Page" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Sign Up Page (Public)
route.get("/signUp", (req, res) => {
  try {
    res.status(200).render("signUp", { title: "Sign Up Page" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Protected Dashboard (Requires JWT)
route.get("/dashboard", verifyToken, async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).render("index", { title: "User Dashboard", users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API Routes (JSON)

// Public API routes
route.post("/api/users/signup", userController.signUp);
route.post("/api/users/login", userController.loginUser);

// Protected API routes (require JWT)
route.get("/api/users", verifyToken, userController.getAllUsers);
route.put("/api/users/:id", verifyToken, userController.updateUser);
route.delete("/api/users/:id", verifyToken, userController.deleteUser);

export default route;
