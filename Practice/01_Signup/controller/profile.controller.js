import Profile from "../models/profiles.models.js";

export default {
  createProfile: async (req, res) => {
    try {
      const { name, gender } = req.body;
      if (!name || !gender)
        return res.status(400).json({ message: "Name and Gender required" });

      const profile = await Profile.create({
        name,
        gender,
        createdBy: req.user.id, // <-- fix here (lowercase 'user')
      });

      res.status(201).json({
        message: "Profile Created",
        profile,
      });
    } catch (error) {
      console.error("Profile Creation Error:", error);
      return res.status(500).json({
        message: "Server Error",
        error: error.message,
      });
    }
  },
  readProfile: async (req, res) => {
    try {
      const profile = await Profile.find({ createdBy: req.user.id }).populate(
        "createdBy",
        " name email"
      );
      res.status(200).json({
        message: "Profile Found",
        profile,
      });
    } catch (error) {
      console.log("Error reading profile:", error);
      return res.status(500).json({
        message: "Server Error",
        error: error.message,
      });
    }
  },
  updateProfile: async (req, res) => {
    try {
      const { oldName, newName, oldGender, newGender } = req.body;
      const profile = await Profile.findOne({
        createdBy: req.user.id,
        name: oldName,
        gender: oldGender,
      });

      if (!profile)
        return res.status(404).json({ message: "Profile not found" });

      if (newName) profile.name = newName;
    if (newGender) profile.gender = newGender;

      await profile.save();
      res.status(200).json({
        message: "Profile updated successfully",
        profile,
      });
    } catch (error) {
      console.log(`Profiel Upate error ${error}`);
      return res.status(500).json({
        message: "server error",
        error: error.message,
      });
    }
  },
  deleteProfile: async (req, res) => {
  try {
    const { name, gender } = req.body;

    if (!name || !gender)
      return res.status(400).json({ message: "Name and Gender required to delete" });

    // Find the profile belonging to the logged-in user
    const profile = await Profile.findOne({
      createdBy: req.user.id,
      name: name,
      gender: gender
    });

    if (!profile)
      return res.status(404).json({ message: "Profile not found" });

    // Delete the profile
    await profile.deleteOne(); // ✅ works on the document

    res.status(200).json({
      message: "Profile deleted successfully",
      profile
    });

  } catch (error) {
    console.log("Profile delete error:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
}

};
