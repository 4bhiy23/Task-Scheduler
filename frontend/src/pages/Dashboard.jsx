import React from "react";
import { Plus } from "lucide-react";
import ProjectCard from "../components/ProjectCard";

const Dashboard = () => {
  const projects = [
    {
      title: "Task Scheduler",
      deadline: "Tomorrow",
      status: "Ongoing",
    },
    {
      title: "Task Scheduler 2",
      deadline: "Tomorrow",
      status: "Ongoing",
    },
    {
      title: "Task Scheduler one more",
      deadline: "Tomorrow",
      status: "Ongoing",
    },
    {
      title: "Task Scheduler one more",
      deadline: "Tomorrow",
      status: "Ongoing",
    },
    {
      title: "Task Scheduler one more",
      deadline: "Tomorrow",
      status: "Ongoing",
    },
    {
      title: "Task Scheduler one more",
      deadline: "Tomorrow",
      status: "Ongoing",
    },
    {
      title: "Task Scheduler one more",
      deadline: "Tomorrow",
      status: "Ongoing",
    },
    {
      title: "Task Scheduler one more",
      deadline: "Tomorrow",
      status: "Ongoing",
    },
    {
      title: "Task Scheduler one more",
      deadline: "Tomorrow",
      status: "Ongoing",
    },
  ];
  // const projects=[]
  return (
    <div className="p-2">
      <div className="w-full h-screen">
        <h1 className="text-5xl font-bold mb-10">Task Scheduler</h1>

        {/* Project Cards */}
        {projects.length === 0 ? (
          <h1>No Projecs Found</h1>
        ) : (
          <div className="w-full grid grid-cols-4 gap-4 place-items-center">
            {projects.map((e, idx) => (
              <ProjectCard details={e} key={idx} />
            ))}
            <div className="flex justify-center items-center w-xs h-full border-2 border-dashed">
              <Plus />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
