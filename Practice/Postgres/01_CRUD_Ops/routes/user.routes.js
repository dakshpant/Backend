import express from "express";
import User from "../models/user.model.js";
import userController from "../controllers/user.controller.js";
import { verifyToken } from "../helpers/jwt.js";
import { success, failed } from "../helpers/customMsg.js";

const route = express.Router();

// Web Routes

// Home (Public)
route.get("/", (req, res) => {
  try {
    res.status(200).render("logIn", { title: "Login Page" });
  } catch (err) {
    next(err);
  }
});

// Sign Up Page (Public)
route.get("/signUp", (req, res) => {
  try {
    res.status(200).render("signUp", { title: "Sign Up Page" });
  } catch (err) {
    next(err);
  }
});

// Protected Dashboard (Requires JWT)
route.get("/dashboard", verifyToken, async (req, res) => {
  try {
    const users = await User.findAll();

    res.status(200).render("index", { title: "User Dashboard", users });
  } catch (err) {
    next(err);
  }
});

route.get("/userProfile", verifyToken, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).render("userProfile", { title: "User Profile", user });
  } catch (err) {
    next(err);
  }
});

route.get("/verifyOtp", async (req, res, next) => {
  try {
    const { email } = req.query; // extract email from query
    if (!email) {
      return res.status(400).send("Email is required to verify OTP");
    }
    res.status(200).render("verifyOtp", { title: "Verify OTP", email, msg:"" });
  } catch (err) {
    next(err);
  }
});

// Extra JSON route for dashboard frontend
route.get("/getAllUsers/json", verifyToken, userController.getAllUsers);

// API Routes (JSON)
// Public API routes
route.post("/api/users/signup", userController.signUp);
route.post("/api/users/login", userController.loginUser);

// Protected API routes (require JWT)
route.get("/api/users", verifyToken, userController.getAllUsers);
route.put("/api/users/:id", verifyToken, userController.updateUser);
route.delete("/api/users/:id", verifyToken, userController.deleteUser);
route.post("/api/users/verify-otp", userController.verifyOtp);
route.post("/api/users/toggle-2fa", verifyToken, userController.toggle2FA);

export default route;
