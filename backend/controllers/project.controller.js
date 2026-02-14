import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { projectsTable } from "../models/project.models.js";

export async function addNewProject(req, res) {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({
      error: "Please provide both name and description of the Project.",
    });
  }

  const [existing] = await db
    .select()
    .from(projectsTable)
    .where((table) => eq(table.name, name));

  if (existing) {
    return res
      .status(400)
      .json({ error: `Project with name: ${name} already exists.` });
  }

  const projectId = await db.insert(projectsTable).values({
    name: name,
    description: description,
  });

  return res
    .status(201)
    .json({ success: `Project ${name} is added succesfully!` });
}

export async function getAllProjects(req, res) {
  const data = await db
    .select({
      projectId: projectsTable.projectId,
      name: projectsTable.name,
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
        name: projectsTable.name,
        description: projectsTable.description,
      })
      .from(projectsTable)
      .where((table) => eq(table.projectId, id));

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
