import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
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
      const { name, email, password, role } = req.body;
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
        role,
      });
      console.log({ newUser });

      // JWT Token Generation for email verification
      const verificationToken = jwt.sign(
        { id: newUser._id,email: newUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      console.log({ verificationToken });

      // mail verification
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
      // verification Link
      const verificationLink = `http://localhost:3000/verify/${verificationToken}`;

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: newUser.email,
        subject: "Email Verification",
        html: `<h3>Welcome to our App, ${newUser.name}!</h3>
               <p>Please verify your email by clicking the link below:</p>
               <a href="${verificationLink}">Verify Email</a>
               <p>This link will expire in 1 hour.</p>`,
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
      const { email, password, name } = req.body;
      const existingUserCheck = await User.findOne({ email });

      console.log({ existingUserCheck });
      // finding suser by email
      if (!existingUserCheck) {
        return res
          .status(404)
          .json({ message: "User not found! Please sign up first." });
      }
      // checkinf for verificetion to be false
      if (!existingUserCheck.isVerified) {
        return res
          .status(403)
          .json({ message: "Please verify your email before logging in." });
      }
      // pass chack
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
        token: token,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: `Internal Server error ${error.message}....` });
    }
  },
  dashboardRoute: async (req, res) => {
    try {
      const { id, name, email } = req.user;
      res.status(201).json({
        message: `Welcome back ${name} !`,
        userId: id,
        email: email,
      });
    } catch (error) {
      res.status(500).json({
        message: `Internal Server error`,
        error: error.message,
      });
    }
  },
  verifyUserRoute: async (req, res) => {
    try {
      const { token } = req.params;
      console.log({ token });
      // verify the token
      let decodeToken ;
      decodeToken = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({ _id: decodeToken.id});
      if (!user) {
        return res.status(400).json({ message: "Invalid or missing token" });
      }
      user.isVerified = true;
      await user.save();
      res.status(201).json({
        message: `User Verified Successfully....`,
        token: `${user}`,
      });
    } catch (error) {
      res.status(500).json({
        message: `Internal Server error`,
        error: error.message,
      });
    }
  },
};
