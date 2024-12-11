import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ error: "Invalid cookies" });

  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken });
  if (!foundUser)
    return res.status(401).json({ error: "Please log in again." });

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username)
      return res.status(403).json({ error: "Invalid refresh token" });

    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      {
        userinfo: {
          username: foundUser.username,
          roles: roles,
          userId: foundUser._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken });
  });
};
