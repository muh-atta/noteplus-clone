import { Task } from "../types/task";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import EditTaskModal from "./EditTaskModel";
import { useState } from "react";
import { useUI } from "../context/ContextPage";

type TaskFromImage = Task & {
  createdBy?: string;
  updatedAt?: string | Date;
  description?: string;
};

interface TaskItemProps {
  task: TaskFromImage;
  onDelete: (id: string) => void;
  onUpdate: (id: string, newTitle: string, description: string) => void;
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
  const { userName } = useUI();
  const createdBy = userName || "Unknown";
  const updatedAt = task.updatedAt
    ? formatDate(new Date(task.updatedAt))
    : formatDate(new Date());
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => setIsEditing(true);

  return (
    <tr className="hover:bg-gray-50 transition-colors align-top">
      <td className="px-6 py-11 text-center text-sm font-medium text-gray-900 max-w-sm">
        <Popover className="relative">
          <Popover.Button className="truncate w-full cursor-pointer">
            {task.title}
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-10 bg-white border border-gray-200 shadow-xl p-4 rounded-md left-0">
              {task.title}
            </Popover.Panel>
          </Transition>
        </Popover>
      </td>
      <td className="px-6 py-11 text-sm font-medium text-gray-900 max-w-xl">
        <Popover className="relative">
          <Popover.Button className="truncate w-full text-center cursor-pointer">
            {task.description || "No description provided"}
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-10 bg-white border border-gray-200 shadow-xl p-4 rounded-md max-w-xl left-0">
              {task.description}
            </Popover.Panel>
          </Transition>
        </Popover>
      </td>
      <td className="px-6 text-center py-11  whitespace-nowrap text-sm font-medium text-gray-900">
        {createdBy}
      </td>
      <td className="px-6 text-center py-11  whitespace-nowrap text-sm font-medium text-gray-900">
        {updatedAt}
      </td>
      <td className="px-6 py-11 whitespace-nowrap text-sm font-medium text-center">
        <div className="flex items-center justify-center space-x-2">
          <input
            type="checkbox"
            checked={task?.done}
            onChange={() => onToggle(task.id)}
            className="h-5 w-5 md:h-6 md:w-6 border-2 rounded-md cursor-pointer 
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
          taskDescription={task.description ?? ""}
          onUpdate={(newTitle, newDescription) =>
            onUpdate(task.id, newTitle, newDescription)
          }
          onClose={() => setIsEditing(false)}
        />
      )}
    </tr>
  );
}
