import User from "../models/User.js";

export const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt)
    return res.status(200).json({ message: "No active session" });

  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken });
  if (!foundUser) return res.status(404).json({ message: "No User found" });

  foundUser.refreshToken = "";
  const result = await foundUser.save();
  console.log(result);

  res.clearCookie("jwt");
  res.status(200).json({ message: "Logged out successfully" });
};
