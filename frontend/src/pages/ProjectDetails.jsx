import React, { useEffect, useState, useRef } from "react";
import { Circle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const formatToLocalDate = (dateInput) => {
  if (!dateInput) return "N/A";

  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return "N/A";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const ProjectDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { project } = location.state ?? {};
  // console.log(project)

  // Milestones State
  const [milestones, setMilestones] = useState([]);
  const [creatingMilestone, setCreatingMilestone] = useState(false);
  const [newMilestoneTitle, setNewMilestoneTitle] = useState("");
  const inputRef = useRef(null);

  // Focus when input appears
  useEffect(() => {
    if (creatingMilestone) {
      inputRef.current.focus();
    }
  }, [creatingMilestone]);

  // Create milestone on Enter
  const handleCreateMilestone = () => {
    if (!newMilestoneTitle.trim()) return;

    setMilestones((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: newMilestoneTitle,
        tasks: [],
      },
    ]);

    setNewMilestoneTitle("");
    setCreatingMilestone(false);
  };

  // Add task with focus
  const [creatingTasks, setCreatingTasks] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const taskInputRef = useRef(null);

  useEffect(() => {
    if (creatingTasks) {
      taskInputRef.current.focus();
    }
  }, [creatingTasks]);

  // Add Task Logic
  const handleCreateTask = (milestoneId) => {
  if (!newTaskTitle.trim()) return;

  setMilestones((prev) =>
    prev.map((m) =>
      m.id === milestoneId
        ? {
            ...m,
            tasks: [
              ...m.tasks,
              {
                id: crypto.randomUUID(),
                title: newTaskTitle,
                assignedTo: "Ramlal",
                isCompleted: false
              },
            ],
          }
        : m
    )
  );

  setNewTaskTitle("");
  setCreatingTasks(false);
};

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <button onClick={() => navigate(-1)}>← Back</button>

      <h1 className="text-4xl font-bold mb-6">{project?.title}</h1>

      <div className="flex justify-between items-start bg-white rounded-2xl shadow-md p-6 mb-10">
        <div className="space-y-4">
          <div>
            <p className="text-gray-500 text-sm">Started</p>
            <p className="font-medium">
              {formatToLocalDate(project?.startDate)}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Deadline</p>
            <p className="font-medium">{formatToLocalDate(project?.endDate)}</p>
          </div>

          <div>
            <h1>Members</h1>
            {project.members.map(e => {
              <p>{e}</p>
            })}
          </div>
          
        </div>

        <div>
          <span className="px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm font-semibold">
            {project?.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Milestones */}
        <div className="col-span-2 bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Milestones</h2>

          <div className="flex flex-col gap-4">
            {milestones.map((m) => (
              <div key={m.id} className="border p-4 rounded">
                <p className="font-semibold">{m.title}</p>

                {m.tasks.map((task) => (
                  <div key={task.id} className="flex w-full justify-between">
                    <p>{task.title}</p>
                    <p>{task.assignedTo}</p>
                    <select>
                      <option value="pending">PENDING</option>
                      <option value="ongoing">ONGOING</option>
                      <option value="completed">COMPLETED</option>
                    </select>
                  </div>
                ))}
                {creatingTasks && (
                  <input
                    ref={taskInputRef}
                    type="text"
                    value={newTaskTitle}
                    placeholder="Enter Task"
                    className="border p-2 rounded"
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleCreateTask(m.id);
                      if (e.key === "Escape") {
                        setCreatingTasks(false);
                        setNewTaskTitle("");
                      }
                    }}
                  />
                )}

                <button
                  className="text-sm text-blue-500 mt-2"
                  onClick={() => setCreatingTasks(true)}
                >
                  Add Task
                </button>
              </div>
            ))}

            {/* Input appears when creatingMilestone is true */}
            {creatingMilestone && (
              <input
                ref={inputRef}
                type="text"
                value={newMilestoneTitle}
                placeholder="Enter milestone title"
                className="border p-2 rounded"
                onChange={(e) => setNewMilestoneTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCreateMilestone();
                  if (e.key === "Escape") {
                    setCreatingMilestone(false);
                    setNewMilestoneTitle("");
                  }
                }}
              />
            )}

            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setCreatingMilestone(true)}
            >
              Add Milestone
            </button>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold mb-4">Progress</h2>
          <Circle />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
