import { v4 as uuidv4 } from "uuid";
/** In-memory store */
const tasks = [];
/** Seed with an example (optional) */
(function seed() {
  tasks.push({
    id: uuidv4(),
    title: "Sample Task",
    description: "This is an example task",
    dueDate: new Date().toISOString().slice(0, 10),
    status: "pending",
  });
})();

export function list() {
  return tasks;
}

export function findById(id) {
  return tasks.find((t) => t.id === id) || null;
}

export function create({ title, description = "", dueDate, status }) {
  const newTask = {
    id: uuidv4(),
    title,
    description,
    dueDate,
    status,
  };
  tasks.push(newTask);
  return newTask;
}

export function update(id, updates) {
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return null;
  tasks[idx] = { ...tasks[idx], ...updates };
  return tasks[idx];
}

export function remove(id) {
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return false;
  tasks.splice(idx, 1);
  return true;
}
