import mongoose from "mongoose";
import { Project } from "../models/projectModel.js";
import { Milestones } from "../models/milestoneModel.js"
import dotenv from "dotenv";
dotenv.config();;

import connectDB from "../DB/db.js"
connectDB()

const seedDB = async () => {
  try {
    await Project.deleteMany({});
    await Milestones.deleteMany({});

    // Create milestones first
    const milestoneDocs = await Milestones.insertMany([
      { title: "Design UI", isCompleted: true },
      { title: "Setup Backend API", isCompleted: true },
      { title: "Integrate Frontend with API", isCompleted: false },
      { title: "Add Authentication", isCompleted: false },
      { title: "Deployment", isCompleted: false }
    ]);

    // Create projects referencing milestones
    await Project.insertMany([
      {
        title: "Milestone Tracker App",
        description: "A full-stack app to manage project milestones",
        startDate: new Date("2026-02-01"),
        endDate: new Date("2026-03-30"),
        status: "ONGOING",
        milestones: [
          milestoneDocs[0]._id,
          milestoneDocs[1]._id,
          milestoneDocs[2]._id
        ]
      },
      {
        title: "Portfolio Website",
        description: "Personal developer portfolio",
        startDate: new Date("2026-01-10"),
        endDate: new Date("2026-02-15"),
        status: "COMPLETED",
        milestones: [
          milestoneDocs[0]._id,
          milestoneDocs[4]._id
        ]
      },
      {
        title: "Experimental AI Tool",
        description: "Side project exploring AI APIs",
        startDate: new Date("2026-02-15"),
        status: "DROPPED",
        milestones: [
          milestoneDocs[3]._id
        ]
      }
    ]);

    console.log("Database seeded successfully 🌱");
    process.exit(0);

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDB();