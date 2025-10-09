import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

class User extends Model {}

// Initialize the model
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
    },
  },
  {
    sequelize,        // pass the sequelize instance
    modelName: "User", // model name
    tableName: "users", // table name in DB
    timestamps: true,   // adds createdAt and updatedAt
  }
);

export default User;
