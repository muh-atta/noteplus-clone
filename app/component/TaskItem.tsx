"use client";
import { useState } from "react";
import { Pencil, Trash } from "lucide-react";
import { Task } from "../types/task";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
export default function TaskItem({
  task,
  onDelete,
  onUpdate,
  onToggle,
}: {
  task: Task;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string) => void;
  onToggle: (id: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleUpdate = () => {
    const trimmed = editTitle.trim();
    if (!trimmed) return alert("Task cannot be empty.");
    if (trimmed.length > 200) return alert("Task limit is 1–200 characters.");
    onUpdate(task.id, trimmed);
    setIsEditing(false);
  };

  const handleUpdateCancel = () => {
    setEditTitle("");
    setIsEditing(false);
  };

  return (
    <li className="bg-white p-4 rounded-xl shadow flex justify-between gap-3">
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id)}
          className="hidden peer"
        />

        <span
          className="
      w-6 h-6 flex items-center justify-center rounded-md
      border-2 border-gray-400
      peer-checked:border-blue-500 peer-checked:bg-blue-500
      transition-all duration-300
    "
        >
          <FontAwesomeIcon
            icon={faCheck}
            className="
        text-white text-sm opacity-0 
        peer-checked:opacity-100 
        transition-opacity duration-200
      "
          />
        </span>
      </label>

      {isEditing ? (
        <div className="flex flex-1 gap-2">
          <input
            value={editTitle}
            autoFocus
            onChange={(e) => setEditTitle(e.target.value)}
            className="
    flex-1 border-b px-2 py-1
    focus:outline-none 
    focus:border-blue-600
    transition-all 
  "
          />

          <button
            onClick={handleUpdate}
            className="px-3 py-1 bg-blue-700 text-white rounded"
          >
            Save
          </button>
          <button
            onClick={handleUpdateCancel}
            className="px-3 py-1 bg-blue-700 text-white rounded"
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-start gap-3 w-full">
            {/* checkbox/icon */}

            <span className="flex-1 text-left font-medium break-words max-w-[920px]">
              {task.title}
            </span>

            {/* action buttons here */}
          </div>

          <div className="flex gap-2">
            <button onClick={() => setIsEditing(true)}>
              <Pencil className="w-5 h-5 font-extrabold text-blue-700" />
            </button>
            <button onClick={() => onDelete(task.id)}>
              <Trash className="w-5 h-5 text-blue-700" />
            </button>
          </div>
        </>
      )}
    </li>
  );
}
