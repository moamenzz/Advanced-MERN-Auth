import express from "express";
import { handleResetPassword } from "../controllers/resetPasswordController.js";

export const resetPasswordRouter = express.Router();

resetPasswordRouter.post("/:resetToken", handleResetPassword);
