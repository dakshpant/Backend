import jwt from "jsonwebtoken";
import User from "../models/users.modals.js";

export default {
  homeRoute: async (req, res) => {
    try {
      res.status(200).send(`Welcome to the Home Page`);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: err.message });
    }
  },
  userSignUpRoute: async (req, res) => {
    try {
      const { name, email, password, to, subject } = req.body;
      const existingUserCheck = await User.findOne({ email });
      if (existingUserCheck) {
        return res.status(400).json({
          message: `User already exist! try loggingIn with email and password...`,
        });
      }
      const newUser = await User.create({
        name,
        email,
        password,
        to,
        subject,
      });
      res.status(200).json({ message: `SignUp success`, user: newUser.name });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  },
  userSignInRoute: async (req, res) => {
    try {
      const { email, password, name} = req.body;
      const existingUserCheck = await User.findOne({ email });
      
      console.log({existingUserCheck});
      if (!existingUserCheck) {
        return res
          .status(404)
          .json({ message: "User not found! Please sign up first." });
      }

      const matchPassword = await existingUserCheck.comparePassword(password);
      if (!matchPassword)
        return res.status(400).json({ message: `Invalid Password, try Again` });

      //   JWT Token Generation

      const token = jwt.sign(
        {
          id: existingUserCheck._id,
          email: existingUserCheck.email,
          name: existingUserCheck.name,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

    //   existingUserCheck.token = token;
    //   await existingUserCheck.save();

    //   res.redirect(
    //     `/dashboard?username=${encodeURIComponent(existingUserCheck.name)}`
    //   );

        res.status(200).json({
          message: `Log In Success`,
          token : token
        });
    } catch (error) {
      res
        .status(500)
        .json({ message: `Internal Server error ${error.message}....` });
    }
  },
  dashboardRoute: async(req,res)=>{
    try {
        const { id, name, email } = req.user;
        res.status(201).json({
      message: `Welcome back ${name} !`,
      userId: id,
      email: email,
    });
    } catch (error) {
        res.status(500).json({
            message:`Internal Server error`,
            error: error.message
        })
    }
  }
};
