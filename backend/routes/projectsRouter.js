import express from "express";
import { Project } from "../models/projectModel.js";
import { Milestones } from "../models/milestoneModel.js";
const router = express.Router()

// Display all Projects
router.get('/', async (req, res) => {
    const projects = await Project.find()
    // if(projects.length === 0) return res.send("No projects found")
    return res.send(projects)
})

// Get Project with id
router.get("/:id", async (req, res) => {
    const project = await Project.findById({ _id: req.params.id })
    return res.send(project)
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

        return res.status(201).json({
            success: true,
            message: "Project added successfully",
            data: newProject
        })

    } catch (error) {
        console.error("CREATE ERROR:", error)

        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

router.get("/:projectID/milestone", async (req, res) => {
    try{
        const project = await Project.findById({_id: req.params.projectID}).populate("milestones") 
        // const project = await Project.findById({_id: req.params.projectID})
        if(!project) return res.json({
            success: false,
            message: "Project not found"
        })
        
        if(project.length === 0){
            return res.json({
                success: true,
                message: "No milestones set"
            })
        }
        
        return res.json({
            success: true,
            res: project.milestones
        })
    } catch (err){
        console.log("Error getting milestones: ", err)
    }
})

router.post("/:projectId/milestone", async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const {title} = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.json({
        success: true,
        message: "Project not found"
    });
    }

    const createdMilestone = await Milestones.create({
        title
    })

    project.milestones.push(createdMilestone)
    await project.save()

    return res.json({
        success: true,
        message: "Milestone added successfully"
    })

  } catch (error) {
    return res.json({ message: error.message });
  }
});

router.post("/:projectId/milestone/:milestoneId/task", async (req, res) => {
  try {
    const { projectId, milestoneId } = req.params;
    const { title, assignedTo } = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.json({ message: "Project not found" });
    }

    const milestone = project.milestones.id(milestoneId);
    if (!milestone) {
      return res.json({ message: "Milestone not found" });
    }

    milestone.tasks.push({
      title,
      assignedTo,
      status: "PENDING"
    });

    await project.save();

    return res.json({
      success: true,
      tasks: milestone.tasks
    });

  } catch (error) {
    return res.json({ message: error.message });
  }
});

export default router