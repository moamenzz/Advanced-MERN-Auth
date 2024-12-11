import User from "../models/User.js";
import { sendWelcomeEmail } from "../utils/mailtrapEmail.js";

export const verifyUser = async (req, res) => {
  const { code } = req.body;

  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiration: { $gt: Date.now() },
    });

    if (!user)
      return res
        .status(400)
        .json({ error: "Verification Code is invalid or expired" });

    user.isVerified = true;
    user.verificationToken = undefined || "";
    user.verificationTokenExpiration = undefined || "";
    user.save();

    await sendWelcomeEmail(user.email, user.username);

    res.status(200).json({ success: "Succesfully verified" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server Error" });
  }
};
