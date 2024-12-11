import express from "express";
import { handleCreateUser } from "../controllers/registerController.js";

export const registerRouter = express.Router();

registerRouter.post("/", handleCreateUser);
