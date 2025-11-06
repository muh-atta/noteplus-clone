"use client";
import { useState } from "react";
import { Pencil, Trash } from "lucide-react";
import { Task } from "../types/task";

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
    onUpdate(task.id, editTitle);
    setIsEditing(false);
  };

  return (
    <li className="bg-white p-4 rounded-xl shadow flex justify-between">
      <div className="space-x-4">
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id)}
          className="w-5 h-5 accent-green-600 cursor-pointer mr-3"
        />
      </div>
      {isEditing ? (
        <div className="flex flex-1 gap-2">
          <input
            value={editTitle}
            autoFocus
            onChange={(e) => setEditTitle(e.target.value)}
            className="flex-1 border-b px-2 py-1 focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleUpdate}
            className="px-3 py-1 bg-green-500 text-white rounded"
          >
            Save
          </button>
        </div>
      ) : (
        <>
          <span className="flex-1 font-medium">{task.title}</span>
          <div className="flex gap-2">
            <button onClick={() => setIsEditing(true)}>
              <Pencil className="w-5 h-5 text-blue-500" />
            </button>
            <button onClick={() => onDelete(task.id)}>
              <Trash className="w-5 h-5 text-red-500" />
            </button>
          </div>
        </>
      )}
    </li>
  );
}
