import { Task } from "../types/task";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/solid";
import { RotateCcw } from "lucide-react";
import EditTaskModal from "./EditTaskModel";
import { useState } from "react";
import { useUI } from "../context/ContextPage";
import ConfirmModal from "./ConfirmModal";

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
  showToggleActions?: boolean;
  showEditActions?: boolean;
  showDeleteActions?: boolean;
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
  showToggleActions,
  showEditActions,
  showDeleteActions,
}: TaskItemProps) {
  const { userName } = useUI();
  const createdBy = userName || "Unknown";
  const updatedAt = task.updatedAt
    ? formatDate(new Date(task.updatedAt))
    : formatDate(new Date());
  const [isEditing, setIsEditing] = useState(false);

  const [confirmAction, setConfirmAction] = useState<null | "edit" | "delete" | "toggle">(null);
  const handleConfirm = () => {
    if (confirmAction === "delete") onDelete(task.id);
    if (confirmAction === "toggle") onToggle(task.id);
    setConfirmAction(null);
  };

  const handleCancel = () => setConfirmAction(null);
  console.log("showToggleActions", showDeleteActions)
  return (
    <tr className="hover:bg-gray-50 transition-colors align-top">
      <td className="px-4 py-8 text-center text-sm font-medium text-gray-900 truncate max-w-xs">
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
      <td className="px-4 py-8 text-center text-sm font-medium text-gray-900 truncate max-w-xs">
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
      <td className="px-8 text-center py-8  whitespace-nowrap text-sm font-medium text-gray-900">
        {createdBy}
      </td>
      <td className="px-8 text-center py-8  whitespace-nowrap text-sm font-medium text-gray-900">
        {updatedAt}
      </td>
       <td className="px-8 py-8 whitespace-nowrap text-sm font-medium text-center">
          <div className="flex items-center justify-center space-x-2">
        {(showDeleteActions || showToggleActions) && (              <button
                onClick={() => setConfirmAction("toggle")}
                className={`
                  p-2 rounded-lg transition-colors
                  ${task.done
                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                    : "bg-gray-200 text-gray-900 hover:bg-gray-400"}
                  flex items-center justify-center
                `}
                title={task.done ? "Mark incomplete" : "Mark complete"}
              >
                {task.done ? <RotateCcw className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
              </button>
            )}
            {showEditActions && (
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
                title="Edit"
              >
                <PencilIcon className="h-4 w-4" />
              </button>
            )}
            {showDeleteActions && (
              <button
                onClick={() => setConfirmAction("delete")}
                className="p-2 rounded-lg bg-pink-100 text-pink-700 hover:bg-pink-200 transition-colors"
                title="Delete"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            )}
            {!showDeleteActions && !showEditActions && !showToggleActions && (
            <button
                onClick={() => setConfirmAction("delete")}
                className="p-2 rounded-lg bg-pink-100 text-pink-700 hover:bg-pink-200 transition-colors"
                title="Delete"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
          )}
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
      {confirmAction && (
        <ConfirmModal
          message={`Are you sure you want to ${confirmAction} this task?`}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </tr>
  );
}
