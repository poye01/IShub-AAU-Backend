import express from "express";
import taskRoutes from "./routes/taskRoutes.js";
const app = express();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(express.json());
// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});
// Routes
app.use("/tasks", taskRoutes);
// 404 handler for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});
// Centralized error handler
app.use((err, req, res, next) => {
  console.error(err); // For debugging
  const status = err.status || 500;
  res.status(status).json({ error: err.message || "Internal Server Error" });
});
app.listen(PORT, () => {
  console.log(`Task Manager API running on http://localhost:${PORT}`);
});
