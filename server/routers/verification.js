import express from "express";
import { verifyUser } from "../controllers/verificationController.js";

export const verifyRouter = express.Router();

verifyRouter.post("/", verifyUser);
