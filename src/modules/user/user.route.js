import { Router } from "express";
import * as user_controller from "./user.controller.js";
import { error_handle } from "../../middlewares/error.handle.middleware.js";
import { multer_host } from "../../middlewares/multer.middleware.js";
import { extensions } from "../../utils/file-extensions.utils.js";
const user_router = Router();

user_router.post(
  "/register",
  multer_host(extensions.images).single("image"),
  error_handle(user_controller.register)
);
user_router.post("/login", error_handle(user_controller.login));

export default user_router;
