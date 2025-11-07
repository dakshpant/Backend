import { DataTypes, ENUM, Model } from "sequelize";
import sequelize from "../config/db.js";
import bcrypt from "bcrypt";

class User extends Model {
  // Compare input password with hashed password
  async comparePassword(inputPass) {
    if (!this.password) throw new Error("Password not set for this user");
    return await bcrypt.compare(inputPass, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, // ensures password is not empty
      },
    },
    twoFactorStatus: {
      allowNull: false,
      type: DataTypes.ENUM("Active", "In-Active"),
      defaultValue: "In-Active",
    },
    twoFactorSecret: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    otp:{
      type: DataTypes.STRING,
      allowNull:true
    },
    otpExpires:{
      type: DataTypes.DATE,
      allowNull:true
    }
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
    hooks: {
      // Hash password before creating or updating
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed("password") && user.password) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
  }
);

export default User;
