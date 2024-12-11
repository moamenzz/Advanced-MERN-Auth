import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserID,
} from "../../controllers/usersController.js";
import { verifyRoles } from "../../middleware/verifyRoles.js";
import { ROLES_LIST } from "../../config/roles.js";
import { verifyUserAccess } from "../../middleware/verifyUserAccess.js";

export const usersRouter = express.Router();

usersRouter
  .route("/")
  .get(verifyRoles(ROLES_LIST.Editor, ROLES_LIST.Admin), verifyUserAccess)
  .delete(verifyRoles(ROLES_LIST.Admin), deleteUser);

usersRouter.route("/:id").get(getUserID);
