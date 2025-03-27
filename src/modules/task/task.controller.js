import { task } from "../../../Database/models/task.model.js";
import { Error_handler_class } from "../../utils/error-class.utils.js";

export const create_task = async (req, res, next) => {
  const owner = req.authUser._id;
  const { title, description, status } = req.body;
  const task_object = {
    title,
    description,
    status,
    owner: owner,
  };
  const new_task = await task.create(task_object);
  res
    .status(201)
    .json({ message: "task created successfully", data: new_task });
};
//////////////////////
export const list_tasks = async (req, res, next) => {
  const owner = req.authUser._id;
  const all_tasks = await task.find({ owner: owner });
  if (!all_tasks) {
    return next(
      new Error_handler_class("no tasks found", 400, "list_tasks api")
    );
  }
  res.status(200).json({ message: "tasks that found", data: all_tasks });
};
//////////////////////
export const update_task = async (req, res, next) => {
  const owner = req.authUser._id;
  const { _id } = req.params;
  const { title, description, status } = req.body;
  const updated = await task.findOneAndUpdate(
    { _id: _id, owner: owner },
    { title, description, status },
    { new: true }
  );
  if (!updated) {
    return next(
      new Error_handler_class("task is not updated", 400, "update_task api")
    );
  }
  res.status(200).json({ message: "task updated", data: updated });
};
/////////////////////
export const delete_task = async (req, res, next) => {
  const owner = req.authUser._id;
  const { _id } = req.params;
  const deleted = await task.findOneAndDelete({ _id: _id, owner: owner });
  if (!deleted) {
    return next(
      new Error_handler_class("task is not deleted", 400, "delete_task api")
    );
  }
  res.status(200).json({ message: "task deleted", data: deleted });
};
