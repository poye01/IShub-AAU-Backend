/**
 * @typedef {Object} Task
 * @property {string} id - Unique identifier (UUID v4)
 * @property {string} title - Short title for the task
 * @property {string} [description] - Optional detailed description
 * @property {string} dueDate - ISO 8601 date string (e.g., 2025-08-20)
 * @property {('pending'|'in-progress'|'completed')} status - Task status
*/
const ALLOWED_STATUS = ["pending", "in-progress", "completed"];
export function isValidStatus(value) {
  return ALLOWED_STATUS.includes(value);
}
export function isValidISODate(value) {
  if (typeof value !== "string") return false;
  const d = new Date(value);
  return !Number.isNaN(d.getTime()) && value === d.toISOString().slice(0, 10);
}
export function allowedStatuses() {
  return [...ALLOWED_STATUS];
}
