import User from "../models/User.js";
import crypto from "crypto";
import { sendForgotPasswordEmail } from "../utils/mailtrapEmail.js";
import dotenv from "dotenv";
dotenv.config();

export const handleForgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "All Fields are required" });

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ error: "User not found" });

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiry = Date.now() + 0.3 * 60 * 60 * 1000; // 30 minutes

    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiration = resetTokenExpiry;
    await user.save();

    await sendForgotPasswordEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );

    res.status(200).json({ message: "Reset password link sent to your email" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Something went wrong" });
  }
};
