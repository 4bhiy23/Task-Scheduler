import { db } from "../db/index.js";
import { projectDevelopers } from "../models/projectDevelopers.models.js";
import { usersTable } from "../models/user.models.js";
import { projectsTable } from "../models/project.models.js";
import { eq, and } from "drizzle-orm";

// Add a developer to a project
export async function addDeveloperToProject(req, res) {
  const { projectId, userId } = req.body;

  if (!projectId || !userId) {
    return res.status(400).json({ error: "Please provide both projectId and userId." });
  }

  try {
    // Check if the relation already exists
    const [existing] = await db
      .select()
      .from(projectDevelopers)
      .where(and(
        eq(projectDevelopers.projectId, projectId),
        eq(projectDevelopers.userId, userId)
      ));

    if (existing) {
      return res.status(400).json({ error: "Developer is already assigned to this project." });
    }

    await db.insert(projectDevelopers).values({
      projectId,
      userId
    });

    return res.status(201).json({ success: "Developer added to project successfully." });
  } catch (error) {
    console.error("Error adding developer:", error);
    // Check for foreign key constraint violations (if user or project doesn't exist)
    if (error.code === '23503') {
       return res.status(404).json({ error: "User or Project not found." });
    }
    return res.status(500).json({ error: "Internal server error." });
  }
}

// Remove a developer from a project
export async function removeDeveloperFromProject(req, res) {
  const { projectId, userId } = req.body;

   if (!projectId || !userId) {
    return res.status(400).json({ error: "Please provide both projectId and userId." });
  }

  try {
    const result = await db
      .delete(projectDevelopers)
      .where(and(
        eq(projectDevelopers.projectId, projectId),
        eq(projectDevelopers.userId, userId)
      ))
      .returning();

    if (result.length === 0) {
      return res.status(404).json({ error: "Developer assignment not found." });
    }

    return res.status(200).json({ success: "Developer removed from project successfully." });
  } catch (error) {
    console.error("Error removing developer:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}

// Get all developers for a project
export async function getProjectDevelopers(req, res) {
  const { projectId } = req.params;

  try {
    const developers = await db
      .select({
        userId: usersTable.userId,
        name: usersTable.name,
        email: usersTable.email
      })
      .from(projectDevelopers)
      .innerJoin(usersTable, eq(projectDevelopers.userId, usersTable.userId))
      .where(eq(projectDevelopers.projectId, projectId));

    if (developers.length === 0) {
        // Optional: Check if project exists to distinguish between "no devs" and "invalid project"
        const [project] = await db.select().from(projectsTable).where(eq(projectsTable.projectId, projectId));
        if(!project) return res.status(404).json({ error: "Project not found." });
        
        return res.status(200).json([]); // Return empty array if valid project but no devs
    }

    return res.status(200).json(developers);
  } catch (error) {
    console.error("Error fetching project developers:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}

// Get all projects for a developer
export async function getUserProjects(req, res) {
  const { userId } = req.params;

  try {
    const projects = await db
      .select({
        projectId: projectsTable.projectId,
        title: projectsTable.title,
        description: projectsTable.description,
        startDate: projectsTable.startDate,
        status: projectsTable.status
      })
      .from(projectDevelopers)
      .innerJoin(projectsTable, eq(projectDevelopers.projectId, projectsTable.projectId))
      .where(eq(projectDevelopers.userId, userId));

      if (projects.length === 0) {
        const [user] = await db.select().from(usersTable).where(eq(usersTable.userId, userId));
        if(!user) return res.status(404).json({ error: "User not found." });

        return res.status(200).json([]);
      }

    return res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching user projects:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}
