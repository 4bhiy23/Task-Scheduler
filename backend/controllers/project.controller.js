import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { projectsTable } from "../models/project.models.js";

export async function addNewProject(req, res) {
  const { title, description, startDate } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      error: "Please provide both title and description of the Project.",
    });
  }

  const [existing] = await db
    .select()
    .from(projectsTable)
    .where(eq(projectsTable.title, title));

  if (existing) {
    return res
      .status(400)
      .json({ error: `Project with title: ${title} already exists.` });
  }

  const [newProject] = await db.insert(projectsTable).values({
    title: title,
    description: description,
    startDate: startDate ?? new Date().toISOString(),
  }).returning({ projectId: projectsTable.projectId });

  return res
    .status(201)
    .json({ success: `Project ${title} is added succesfully!`, projectId: newProject.projectId });
  }

export async function getAllProjects(req, res) {
  const data = await db
    .select({
      projectId: projectsTable.projectId,
      title: projectsTable.title,
      description: projectsTable.description,
    })
    .from(projectsTable);

  if (data.length === 0) {
    return res.status(404).json({ message: "No Projects exists!" });
  }

  return res.status(200).json(data);
}

export async function getProjectById(req, res) {
  const id = req.params.id;

  try {
    const project = await db
      .select({
        projectId: projectsTable.projectId,
        title: projectsTable.title,
        description: projectsTable.description,
      })
      .from(projectsTable)
      .where(eq(projectsTable.projectId, id));

    if (project.length === 0) {
      return res
        .status(404)
        .json({ message: `Project with id: ${id} doesn't exists.` });
    }

    return res.status(200).json(project);
    
  } catch (err) {
    return res
      .status(404)
      .json({ message: `Project with id: ${id} doesn't exists.` });
  }
}
