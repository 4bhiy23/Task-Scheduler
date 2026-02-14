import React from "react";

const ProjectCard = ({ details }) => {
    console.log(details)
  return (
    <div className="flex bg-yellow-400 w-xs h-full">
      <div className="bg-amber-700 flex-1">
        <h2 className="text-2xl">{details.title}</h2>
        <p>{details.deadline}</p>
        <p>{details.status}</p>
      </div>
      <div className="flex flex-1 justify-center items-center bg-pink-400">
        Circle
      </div>
    </div>
  );
};

export default ProjectCard;
