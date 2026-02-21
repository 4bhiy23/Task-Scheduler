import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: true,
    // default: ""
  },

  status: {
    type: String,
    enum: ["COMPLETED", "ONGOING", "PENDING"],
    default: "PENDING"
  }
}, { timestamps: true });

const milestoneSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  tasks: [taskSchema]
});

const projectSchema = new mongoose.Schema({
  title: String,

  description: String,

  startDate: Date,
  endDate: Date,

  status: {
    type: String,
    enum: ["ONGOING", "COMPLETED", "DROPPED"],
    default: "ONGOING"
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: true
  },

  members: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      role: {
        type: String,
        enum: ["ADMIN", "DEVELOPER"],
        default: "DEVELOPER"
      }
    }
  ],

  milestones: [milestoneSchema]

}, { timestamps: true });

export const Project = mongoose.model("Project", projectSchema)