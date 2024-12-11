import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  username: {
    type: String,
    required: true,
    unqiue: false,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  roles: {
    User: {
      type: Number,
      default: 2001,
    },
    Editor: Number,
    Admin: Number,
  },
  refreshToken: String,
  verificationToken: String,
  verificationTokenExpiration: Date,
  resetPasswordToken: String,
  resetPasswordTokenExpiration: Date,
});

export default mongoose.model("User", userSchema);
