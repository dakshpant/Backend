import express from 'express';
import userController from "../controller/user.controller.js";

const route = express.Router();

route.get('/', userController.homeRoute);

export default route;

