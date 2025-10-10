import express from "express";
import User from "../models/user.model.js";
import userController from "../controllers/user.controller.js";


const route = express.Router();

route.get("/getAllUsers", async (req, res) => {
  try {
    const users = await User.findAll();
    res.render("index", { title: "User List", users });
    // res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

route.get("/", userController.homeRoute);
route.post("/createUser", userController.createUser);
route.get("/getAllUsers/json", userController.getAllUsers);

route.put("/updateUser/:id", userController.updateUser);
route.delete("/deleteUser/:id", userController.deleteUser);

export default route;
