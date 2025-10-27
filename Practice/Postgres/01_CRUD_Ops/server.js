import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import route from "./routes/user.routes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 

app.use(express.static("public"));
app.set("view engine", "ejs");
// Connect Database
await connectDB();

// Routes
app.use("/", route);

// app.use("/",(req,res)=>{
//     res.status(200).json("Hello World — Express + PostgreSQL + ES6");
// })

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
