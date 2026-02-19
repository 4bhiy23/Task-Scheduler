import express from "express";
import { Project } from "../models/projectModel.js";
const router = express.Router()

// Display all Projects
router.get('/', async (req, res) => {
    const projects = await Project.find()
    res.json({
        message: "Success",
        projects
    })
})

// Get Project with id
router.get("/:id", async (req, res) => {
    const project = await Project.findById({_id: req.params.id})
    res.send(project)
})

// Create project
router.post("/", async (req, res) => {
    const { title, description, startDate, endDate, status, owner } = req.body
    const newProject = await Project.create({
        title,
        description,
        startDate,
        endDate,
        status,
        owner
    })
    res.json({
        success: true,
        message: "Project added successfully"
    })
})

export default router