import React from "react";

const MilestoneListItems = ({ details }) => {
  return (
    <div className="flex justify-between w-3xl bg-purple-400 px-4">
      <p>{details.task}</p>
      <p>{details.assignedTo}</p>
      <input type="checkbox" />
    </div>
  );
};

export default MilestoneListItems;