"use client";
import { useState } from "react";
import { toast } from "react-toastify";
interface EditTaskModalProps {
  taskTitle: string;
  taskDescription: string | "";
  onUpdate: (newTitle: string, newDescription: string) => void;
  onClose: () => void;
}

export default function EditTaskModal({
  taskTitle,
  taskDescription,
  onUpdate,
  onClose,
}: EditTaskModalProps) {
  console.log("taskTitle,taskDescription,", taskTitle, taskDescription);
  const [title, setTitle] = useState(taskTitle);
  const [description, setDescription] = useState(taskDescription);

  const handleSave = () => {
    if (title.trim() !== "" && description.trim() !== "") {
      if (title.length > 50) {
        toast.error("Title cannot be greater than 50 characters!");
        return;
      }
      if (description.length > 300) {
        toast.error("Description cannot be greater than 300 characters!");
        return;
      }
      onUpdate(title, description);
      onClose();
    }
  };

  return (
   <div className="fixed inset-0 z-50 flex items-center justify-center">
  <div className="absolute inset-0 backdrop-blur-xl bg-black/30"></div>

  <div className="relative bg-white rounded-xl w-11/12 max-w-sm p-6 shadow-2xl">
    <h2 className="text-xl text-gray-800 mb-6">Edit Task</h2>

    <div className="mb-4">
      <h4 className="text-gray-800 mb-2">Task</h4>
      <textarea
        className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition resize-none"
        placeholder="Add New Task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        rows={2}
      />
    </div>

    <div className="mb-4">
      <h4 className="text-gray-800 mb-2">Description</h4>
      <textarea
        className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition resize-none"
        placeholder="Add Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
      />
    </div>

    <div className="flex justify-end gap-3 mt-8">
      <button
        className="px-6 py-2 rounded-lg bg-gray-800 text-white font-semibold hover:bg-gray-700 transition"
        onClick={onClose}
      >
        Cancel
      </button>

      <button
        className="px-6 py-2 rounded-lg border bg-white text-gray-800 font-normal hover:bg-gray-100 transition"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  </div>
</div>

  );
}
