import React from "react";
import MilestoneListItems from "../components/MilestoneListItems";
import { Circle } from "lucide-react";

const milestones = [
  {
    task: "Frontend",
    assignedTo: "Abhimanyu",
  },
  {
    task: "Backend",
    assignedTo: "Nitesh",
  },
  {
    task: "Frontend",
    assignedTo: "Abhimanyu",
  },
  {
    task: "Backend",
    assignedTo: "Nitesh",
  },
  {
    task: "Frontend",
    assignedTo: "Abhimanyu",
  },
  {
    task: "Backend",
    assignedTo: "Nitesh",
  },
  {
    task: "Frontend",
    assignedTo: "Abhimanyu",
  },
  {
    task: "Backend",
    assignedTo: "Nitesh",
  },
];

const ProjectDetails = () => {
  return (
    <div>
      <h1 className="text-4xl mb-5">Project Name</h1>
      <div className="flex justify-between items-center bg-pink-300 mb-10">
        <div>
          <p>Started: Today</p>
          <p>Deadline: Tomorrow</p>
          <div>
            <p>Devs:</p>
            <ul>
              <li>Abhimanyu</li>
              <li>Nitesh</li>
            </ul>
          </div>
        </div>
        <div className="pr-4 ">Status: Ongoing</div>
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Milestones */}
        <div className="">
          <h1 className="text-xl">Milestones</h1>
          <div className="flex flex-col gap-4">
            {milestones.map((e, idx) => (
              <MilestoneListItems details={e} key={idx} />
            ))}
          </div>
        </div>
        {/* Progress */}
        <div className="w-full bg-amber-600 flex flex-col justify-center items-center">
            <h1>Progress</h1>
            <Circle />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
