import * as Service from "../data/taskService.js";
import {
  isValidISODate,
  isValidStatus,
  allowedStatuses,
} from "../models/task.js";
// Utils
function badRequest(message) {
  const err = new Error(message);
  err.status = 400;
  return err;
}
function notFound(message) {
  const err = new Error(message);
  err.status = 404;
  return err;
}
// GET /tasks
export function getAllTasks(req, res, next) {
  try {
    const tasks = Service.list();
    res.status(200).json(tasks);
  } catch (e) {
    next(e);
  }
}
// GET /tasks/:id
export function getTaskById(req, res, next) {
  try {
    const { id } = req.params;
    const task = Service.findById(id);
    if (!task) return next(notFound("Task not found"));
    res.status(200).json(task);
  } catch (e) {
    next(e);
  }
}
// POST /tasks
export function createTask(req, res, next) {
  try {
    const { title, description = "", dueDate, status } = req.body || {};
    if (!title || typeof title !== "string") {
      return next(badRequest('"title" is required and must be a string'));
    }
    if (!dueDate || !isValidISODate(dueDate)) {
      return next(
        badRequest('"dueDate" is required and must be ISO date (YYYY-MM-DD)')
      );
    }
    if (!status || !isValidStatus(status)) {
      return next(
        badRequest(
          `"status" is required and must be one of: ${allowedStatuses().join(
            ", "
          )}`
        )
      );
    }
    const task = Service.create({ title, description, dueDate, status });
    res.status(201).json(task);
  } catch (e) {
    next(e);
  }
}
// PUT /tasks/:id
export function updateTask(req, res, next) {
  try {
    const { id } = req.params;
    const existing = Service.findById(id);
    if (!existing) return next(notFound("Task not found"));

    const updates = {};
    const { title, description, dueDate, status } = req.body || {};

    if (title !== undefined) {
      if (typeof title !== "string" || !title.trim()) {
        return next(badRequest('"title" must be a non-empty string'));
      }
      updates.title = title;
    }

    if (description !== undefined) {
      if (typeof description !== "string") {
        return next(badRequest('"description" must be a string'));
      }
      updates.description = description;
    }

    if (dueDate !== undefined) {
      if (!isValidISODate(dueDate)) {
        return next(badRequest('"dueDate" must be ISO date (YYYY-MM-DD)'));
      }
      updates.dueDate = dueDate;
    }

    if (status !== undefined) {
      if (!isValidStatus(status)) {
        return next(
          badRequest(`"status" must be one of: ${allowedStatuses().join(", ")}`)
        );
      }
      updates.status = status;
    }

    const updated = Service.update(id, updates);
    res.status(200).json(updated);
  } catch (e) {
    next(e);
  }
}

// DELETE /tasks/:id
export function deleteTask(req, res, next) {
  try {
    const { id } = req.params;
    const ok = Service.remove(id);
    if (!ok) return next(notFound("Task not found"));
    res.status(204).send();
  } catch (e) {
    next(e);
  }
}
