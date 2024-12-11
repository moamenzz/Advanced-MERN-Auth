import User from "../models/User.js";
import bcrypt from "bcrypt";
import { sendResetPasswordSuccessEmail } from "../utils/mailtrapEmail.js";

export const handleResetPassword = async (req, res) => {
  const { resetToken } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordTokenExpiration: { $gt: Date.now() },
    });
    console.log(resetToken);
    console.log(user.resetPasswordToken);

    if (!user) return res.status(400).json({ error: "No user found" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined || "";
    user.resetPasswordTokenExpiration = undefined || "";
    await user.save();

    await sendResetPasswordSuccessEmail(user.email);

    res.status(200).json({ message: "Password reset successful" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to reset password." });
  }
};
