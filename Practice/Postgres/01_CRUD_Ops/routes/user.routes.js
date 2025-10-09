import express from "express"
import userController from "../controllers/user.controller.js"
 
const route = express.Router();

route.get("/getAllUsers", async(req, res)=>{
    res.render("index");
})

route.get("/", userController.homeRoute);
route.post("/createUser", userController.createUser);
route.get("/getAllUsers/json", userController.getAllUsers)

route.put("/updateUser/:id", userController.updateUser);
route.delete("/deleteUser/:id", userController.deleteUser);

export default route;