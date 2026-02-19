import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { tasksTable } from "../models/task.models.js";
import { projectsTable } from "../models/project.models.js";

export async function addTask(req, res) {
  const { projectId, title, description, status } = req.body;

  if (!projectId || !title) {
    return res.status(400).json({
      error: "Please provide projectId and title for the task.",
    });
  }

  try {
    // Check if project exists
    const [project] = await db
      .select()
      .from(projectsTable)
      .where(eq(projectsTable.projectId, projectId));

    if (!project) {
      return res.status(404).json({ error: `Project with id: ${projectId} not found.` });
    }

    const [newTask] = await db.insert(tasksTable).values({
      projectId,
      title,
      description,
      status: status || 'todo',
    }).returning();

    return res.status(201).json({
      success: true,
      message: "Task added successfully",
      task: newTask
    });
  } catch (error) {
    console.error("Error adding task:", error);
    return res.status(500).json({ error: "Failed to add task" });
  }
}

export async function getTasksByProject(req, res) {
  const { projectId } = req.params;

  if (!projectId) {
    return res.status(400).json({ error: "Project ID is required" });
  }

  try {
    const tasks = await db
      .select()
      .from(tasksTable)
      .where(eq(tasksTable.projectId, projectId));

    return res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({ error: "Failed to fetch tasks" });
  }
}
