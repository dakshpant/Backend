import User from "../models/user.model.js";

export default {
  homeRoute: (req, res) => {
    res.status(200).json("Hello World — Express + PostgreSQL + ES6");
    console.log("Hello World — Express + PostgreSQL + ES6");
    
  },
  createUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = await User.create({ name, email, password });
      console.log(user);
      res.status(201).json({ user });
      

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const user = await User.findAll();
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updateUser: async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.update({ name, email, password });
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
},

  deleteUser: async(req, res)=>{
    try {
        const user = await User.findOne({
            where: { id: req.params.id },
        });
        if (!user) return res.status(404).json({ message: "User not found" });
        await user.destroy();
        res.status(200).json({
            message: "User deleted successfully",
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  }
};
