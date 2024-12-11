import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const handleLogin = async (req, res) => {
  try {
    const { email, pwd } = req.body;

    if (!email || !pwd)
      return res.status(400).json({ error: "All Fields are required." });

    const foundUser = await User.findOne({ email: email });
    if (!foundUser)
      return res.status(401).json({ error: "Email address doesn't exist" });

    const valid = await bcrypt.compare(pwd, foundUser.password);
    if (!valid) return res.status(401).json({ error: "Invalid Credentials" });

    const roles = Object.values(foundUser.roles).filter(Boolean);
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
    const refreshToken = jwt.sign(
      { username: foundUser.username, userId: foundUser._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "30d" }
    );
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      // secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ roles, accessToken });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ error: "Ein interner Serverfehler ist aufgetreten" });
  }
};
