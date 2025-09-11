import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    //User Sign-UP data
    name: {
      type: String,
      required: true,
      //   unique: true,
      //   lowercase: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    pasword: {
      type: String,
      required: true,
    },
    // Mail Data
    // to:{
    //     type:String,
    //     required:true,
    //     lowercase:true,
    // },
    // subject:{
    //     type:String,
    //     required:true,
    // }
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);