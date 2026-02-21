import express from "express";
import { Project } from "../models/projectModel.js";
const router = express.Router()

// Display all Projects
router.get('/', async (req, res) => {
    const projects = await Project.find()
    // if(projects.length === 0) return res.send("No projects found")
    res.send(projects)
})

// Get Project with id
router.get("/:id", async (req, res) => {
    const project = await Project.findById({ _id: req.params.id })
    res.send(project)
})

// Create project
router.post("/", async (req, res) => {
    try {
        const { title, description, startDate, endDate, status } = req.body

        console.log("Incoming:", req.body)

        const newProject = await Project.create({
            title,
            description,
            startDate,
            endDate,
            status
        })

        res.status(201).json({
            success: true,
            message: "Project added successfully",
            data: newProject
        })

    } catch (error) {
        console.error("CREATE ERROR:", error)

        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})
export default router