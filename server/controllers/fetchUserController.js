import User from "../models/User.js";

export const handleFetchUser = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await User.findById(userId).select("-password -refreshToken");
    if (!user) return res.status(404).json({ message: "No User ID Found" });

    res.status(200).json({ user });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
