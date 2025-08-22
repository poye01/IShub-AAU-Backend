import { Router } from "express";
import * as TaskController from "../controllers/taskController.js";
const router = Router();
// GET /tasks: Get a list of all tasks.
router.get("/", TaskController.getAllTasks);
// GET /tasks/:id: Get the details of a specific task.
router.get("/:id", TaskController.getTaskById);

// POST /tasks: Create a new task.
router.post("/", TaskController.createTask);

// PUT /tasks/:id: Update a specific task.
router.put("/:id", TaskController.updateTask);

// DELETE /tasks/:id: Delete a specific task.
router.delete("/:id", TaskController.deleteTask);

export default router;
