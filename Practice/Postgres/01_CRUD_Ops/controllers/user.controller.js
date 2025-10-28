import User from "../models/user.model.js";
import { generateToken } from "../helpers/jwt.js";
import { log } from "console";
export default {
  // Home Route
  homeRoute: (req, res) => {
    console.log("Hello World — Express + PostgreSQL + ES6");
    res.status(200).json("Hello World — Express + PostgreSQL + ES6");
  },

  // Sign Up a new user
  signUp: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res
          .status(400)
          .json({ message: "Name, email, and password are required" });
      }
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }
      const user = await User.create({ name, email, password });
      res.status(201).json({ message: "User created successfully", user })
      console.log(user);

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // Login user
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      // Validations for empty fields
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }
      //searching user from db
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(404).json({ message: "User not found" });
      // Empty pass field validation
      if (!user.password) {
        return res
          .status(500)
          .json({ message: "Password not set for this user" });
      }
      // Checking for pass.
      const isMatch = await user.comparePassword(password);
      if (!isMatch)
        return res.status(401).json({ message: "Invalid password" });

      // JWT TOKEN generation
      const token = generateToken(user);
      console.log(token);
      // stores the generated token as cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 3600000, // 1 hour
      });

      // res.status(200).json({
      //   message: "Login successful",
      //   token,
      //   user: {
      //     id: user.id,
      //     name: user.name,
      //     email: user.email,
      //   },
      // });
      return res.redirect("/dashboard");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // Get all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json({ users });
      console.log(users);

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // Update user by ID
  updateUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      await user.update({ name, email, password });
      res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // Delete user by ID
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      await user.destroy();
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
