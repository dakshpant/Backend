import express from "express"
import userController from "../controllers/user.controller.js"
 
const route = express.Router();

route.get("/", userController.homeRoute);
route.post("/createUser", userController.createUser);
route.get("/getAllUsers", userController.getAllUsers);
route.put("/updateUser/:id", userController.updateUser);
route.delete("/deleteUser/:id", userController.deleteUser);

export default route;