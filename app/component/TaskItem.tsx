
import { Task } from "../types/task";
import {
  PencilIcon,
  TrashIcon,
  LockClosedIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import EditTaskModal from "./EditTaskModel";
import { useState } from "react";

type TaskFromImage = Task & {
  createdBy?: string;
  updatedAt?: string | Date;
  sharedWith?: { type: "private" | "shared"; count: number };
};

interface TaskItemProps {
  task: TaskFromImage;
  onDelete: (id: string) => void;
  onUpdate: (id: string, newTitle: string) => void;
  onToggle: (id: string) => void;
}

const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

export default function TaskItem({
  task,
  onDelete,
  onUpdate,
  onToggle,
}: TaskItemProps) {
  const createdBy = task.createdBy || "Bud Wiser";
  const updatedAt = task.updatedAt
    ? formatDate(new Date(task.updatedAt))
    : formatDate(new Date());
  const sharedWith = task.sharedWith || {
    type: Math.random() > 0.3 ? "shared" : "private",
    count: Math.floor(Math.random() * 10),
  };

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => setIsEditing(true);

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 text-center py-11 whitespace-nowrap uppercase text-sm font-medium text-gray-900">
        {task.title}
      </td>

      <td className="px-6 text-center py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {createdBy}
      </td>

      <td className="px-6 text-center py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {updatedAt}
      </td>

      <td className="px-6 text-center py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        <div className="flex items-center justify-center">
          {sharedWith.type === "private" ? (
            <LockClosedIcon className="h-5 w-5 text-gray-400 mr-2" />
          ) : (
            <UsersIcon className="h-5 w-5 text-gray-400 mr-2" />
          )}
          <span>
            {sharedWith.type === "private"
              ? "Only You"
              : `${String(sharedWith.count).padStart(2, "0")} Share`}
          </span>
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
        <div className="flex items-center justify-center space-x-2">
          <input
            type="checkbox"
            checked={task?.done}
            onChange={() => onToggle(task.id)}
            className="h-5 w-5 md:h-6 md:w-6 border-2 border-gray-400 rounded-md cursor-pointer 
               appearance-none checked:bg-green-500 checked:border-green-500 
               focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 transition-colors duration-200"
            title={task.done ? "Mark incomplete" : "Mark complete"}
          />

          <button
            onClick={handleEdit}
            className="p-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
            title="Edit"
          >
            <PencilIcon className="h-4 w-4" />
          </button>

          <button
            onClick={() => onDelete(task.id)}
            className="p-2 rounded-lg bg-pink-100 text-pink-700 hover:bg-pink-200 transition-colors"
            title="Delete"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </td>

      {isEditing && (
        <EditTaskModal
          taskTitle={task.title}
          onUpdate={(newTitle) => onUpdate(task.id, newTitle)}
          onClose={() => setIsEditing(false)}
        />
      )}
    </tr>
  );
}
