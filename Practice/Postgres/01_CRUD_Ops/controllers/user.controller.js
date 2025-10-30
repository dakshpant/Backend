import User from "../models/user.model.js";
import { generateToken } from "../helpers/jwt.js";
import {success, failed} from "../helpers/customMsg.js";
export default {
  // Home Route
  homeRoute: (req, res,next) => {
    console.log("Hello World — Express + PostgreSQL + ES6");
    // res.status(200).json("Hello World — Express + PostgreSQL + ES6");
    success(res,"Hello World",200)
  },

  // Sign Up a new user
  signUp: async (req, res,next) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) failed(res, "Name, email, and password are required",400)

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) failed(res, "Email already in use",400);

      const user = await User.create({ name, email, password });
      success(res, "User created successfully", user, 200)
      // res.status(201).json({ message: "User created successfully", user });
      console.log(user);
    } catch (err) {
      next(err);
    }
  },
  // Login user
  loginUser: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      // Validations for empty fields
      if (!email || !password)
        return failed( res, "Email and password are required",404)
      //searching user from db
      const user = await User.findOne({ where: { email } });
      // if (!user) return res.status(404).json({ message: "User not found" });
      if (!user) return failed(res, "User not found",404)
      // Empty pass field validation
      if (!user.password)
        return failed(res, "Password not set for this user",500)
      // Checking for pass.
      const isMatch = await user.comparePassword(password);
      if (!isMatch) return failed(res, "Invalid Password",500)

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
    } catch (err) {
      next(err);
    }
  },
  // Get all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      // res.status(200).json({ users });
      success(res, "Users fetched successfully", users,200)
      console.log(users);
    } catch (err) {
      next(err);
    }
  },
  // Update user by ID
  updateUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = await User.findByPk(req.params.id);
      if (!user) return failed(res,"User not found",400) 
      await user.update({ name, email, password });
      // res.status(200).json({ message: "User updated successfully", user });
      success(res, "User updated successfully", user,200)
    } catch (err) {
      next(err);
    }
  },

  // Delete user by ID
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return failed(res, "User not found", 404)
      // res.status(404).json({ message: "User not found" });
      await user.destroy();
      success(res,"User Deleted Successfully",user,200)
      // res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
      next(err);
    }
  },
};