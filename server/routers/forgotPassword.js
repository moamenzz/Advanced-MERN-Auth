import express from "express";
import { handleForgotPassword } from "../controllers/forgotPasswordController.js";

export const forgotPasswordRouter = express.Router();

forgotPasswordRouter.post("/", handleForgotPassword);
