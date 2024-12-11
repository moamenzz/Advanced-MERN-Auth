import express from "express";
import { handleFetchUser } from "../controllers/fetchUserController.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

export const fetchUserRouter = express.Router();

fetchUserRouter.get("/", verifyJWT, handleFetchUser);
