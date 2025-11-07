import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import route from "./routes/user.routes.js";
import errorHandler from "./middleware/errorHandler.js";
import User from "./models/user.model.js"; // import User model

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static("public"));
app.set("view engine", "ejs");

// Connect Database
await connectDB();

// Sync models (for dev mode — ensures columns like twoFactorStatus exist)
await User.sync({ alter: true });
console.log("User table synced successfully");

// Routes
app.use("/", route);

// Global Error Handler
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
