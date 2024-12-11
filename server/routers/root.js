import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { verifyJWT } from "../middleware/verifyJWT.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const rootRouter = express.Router();
rootRouter.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});
