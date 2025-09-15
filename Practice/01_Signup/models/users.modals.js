import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    //User Sign-UP data
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: false,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role:{
      type: String,
      enum:["user","admin"],
      default:"user",
    },
    createProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
    // token: {
    //   type: String,
    //   required: false,
    // },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();
    const saltRounds = 6;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (error) {
    console.error(`DB error Occured ${error}`);
    next(error);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    console.error(`Error Comparing password: ${error}`);
    return false;
  }
};

const User = mongoose.model("User", userSchema);
export default User;
