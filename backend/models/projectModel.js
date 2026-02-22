import mongoose from "mongoose";

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

  milestones: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Milestones"
    }
  ]

}, { timestamps: true });

export const Project = mongoose.model("Project", projectSchema)