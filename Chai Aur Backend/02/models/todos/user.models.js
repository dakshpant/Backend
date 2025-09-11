import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // username : String,
    // email : String,
    // isActive : Boolean
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      // required:[true, "Password is Required!"]
    },
  },
  { timestamps: true }
);

export const user = mongoose.model("User", userSchema); // Empty schema for demonstration purposes
