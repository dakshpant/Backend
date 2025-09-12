import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import UserRoute from "./route/user.route.js";

const app = express();
const port = process.env.PORT || 3000;
dotenv.config();
// Middleware
app.use(express.json()); // ⬅️ This parses JSON body from frontend

// DB connection
connectDB();

app.use("/", UserRoute);

console.log("Mongo URI:", process.env.MONGO_URI);
console.log("Server Port:", process.env.PORT);

app.listen(port, () => {
  console.log(`Server Listening to port ${port}`);
});
