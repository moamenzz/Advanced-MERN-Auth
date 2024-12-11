import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { sendVerificationEmail } from "../utils/mailtrapEmail.js";

export const handleCreateUser = async (req, res) => {
  try {
    const { email, user, pwd } = req.body;

    if (!email || !user || !pwd)
      return res
        .status(400) // 400 ist besser für fehlende Parameter als 403
        .json({ message: "All Fields are required" });

    const duplicate = await User.findOne({ email: email });
    if (duplicate)
      return res.status(409).json({ message: "Email already exists." }); // 409 Conflict ist besser als 204

    const hashedPassword = await bcrypt.hash(pwd, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const result = await User.create({
      email: email,
      username: user,
      password: hashedPassword,
      verificationToken: verificationToken,
      verificationTokenExpiration: Date.now() + 0.25 * 60 * 60 * 1000,
    });

    // Send verification Email
    await sendVerificationEmail(result.email, verificationToken);

    console.log(result);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: { ...result._doc, password: undefined },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" }); // Besseres Error-Handling
  }
};
