import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import { rootRouter } from "./routers/root.js";
import { connectDB } from "./config/dbConn.js";
import { corsOptions } from "./config/corsOptions.js";
import mongoose from "mongoose";
import { registerRouter } from "./routers/register.js";
import { authRouter } from "./routers/auth.js";
import { refreshRouter } from "./routers/refreshToken.js";
import { logoutRouter } from "./routers/logout.js";
import { usersRouter } from "./routers/api/Users.js";
import { verifyJWT } from "./middleware/verifyJWT.js";
import { verifyUserAccess } from "./middleware/verifyUserAccess.js";
import { verifyRouter } from "./routers/verification.js";
import { forgotPasswordRouter } from "./routers/forgotPassword.js";
import { resetPasswordRouter } from "./routers/resetPassword.js";
import { fetchUserRouter } from "./routers/fetchUser.js";

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

app.use(cors(corsOptions));

app.use(cookieParser());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use("/fetch-user", fetchUserRouter);
app.use("/register", registerRouter);
app.use("/verify", verifyRouter);
app.use("/auth", authRouter);
app.use("/refresh", refreshRouter);
app.use("/forgot-password", forgotPasswordRouter);
app.use("/reset-password", resetPasswordRouter);
app.use("/logout", logoutRouter);
app.use("/", rootRouter);

// Import verifyJWT middleware
app.use(verifyJWT);
app.use("/user", usersRouter);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html"))
    return res.sendFile(path.join(__dirname, "views", "404.html"));
  if (req.accepts("json")) return res.json({ error: "page not found" });
  else return res.type("txt").send("Page not Found");
});

mongoose.connection.once("open", (err, db) => {
  console.log("MongoDB is connected and connection is open");
});

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`);
});
