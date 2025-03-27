import { Router } from "express";
import * as task_controller from "./task.controller.js";
import { auth } from "../../middlewares/auth.middleware.js";
import { error_handle } from "../../middlewares/error.handle.middleware.js";
import { authorization } from "../../middlewares/authorization.middleware.js";
import { system_roles } from "../../utils/system_roles.utils.js";

const { USER, ADMIN } = system_roles;
const task_router = Router();

task_router.post(
  "/create",
  auth(),
  authorization([USER, ADMIN]),
  error_handle(task_controller.create_task)
);
task_router.get(
  "/list",
  auth(),
  authorization([USER, ADMIN]),
  error_handle(task_controller.list_tasks)
);
task_router.put(
  "/update/:_id",
  auth(),
  authorization([USER, ADMIN]),
  error_handle(task_controller.update_task)
);
task_router.delete(
  "/delete/:_id",
  auth(),
  authorization([USER, ADMIN]),
  error_handle(task_controller.delete_task)
);

export default task_router;
