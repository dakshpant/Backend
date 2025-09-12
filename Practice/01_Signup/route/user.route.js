import express from 'express';
import userController from "../controller/user.controller.js";
import auth from '../middleware/auth.js'

const route = express.Router();

route.get('/', userController.homeRoute);
route.post('/signUp',userController.userSignUpRoute);
route.post('/signIn',userController.userSignInRoute);
route.get('/dashboard',auth , userController.dashboardRoute)

export default route;

