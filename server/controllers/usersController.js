import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const user = await User.find();
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    console.error(err);
  }
};

export const deleteUser = async (req, res) => {
  try {
    if (!req?.body?.id)
      return res.status(403).json({ error: "Invalid User ID" });

    const user = await User.findOne({ _id: req.body.id });
    if (!user) return res.status(404).json({ error: "User not found" });

    const result = await user.deleteOne({ _id: req.body.id });
    console.log(result);

    res.status(204).json({ error: "User deleted  successfully" });
  } catch (err) {
    console.error(err);
  }
};

export const getUserID = async (req, res) => {
  try {
    if (!req?.params?.id)
      return res.status(403).json({ error: "Invalid User ID" });

    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (e) {
    console.error(e);
  }
};
