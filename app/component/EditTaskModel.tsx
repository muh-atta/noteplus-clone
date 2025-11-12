"use client";
import { useState } from "react";

interface EditTaskModalProps {
  taskTitle: string;
  onUpdate: (newTitle: string) => void;
  onClose: () => void;
}

export default function EditTaskModal({ taskTitle, onUpdate, onClose }: EditTaskModalProps) {
  const [title, setTitle] = useState(taskTitle);

  const handleSave = () => {
    if (title.trim() !== "") {
      onUpdate(title);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-11/12 max-w-sm p-6 shadow-2xl">
        
        <h2 className="text-xl text-gray-800 mb-6">
          Edit Task
        </h2>

        <h4 className="text-gray-800 mb-2">Task</h4>

        <input
          type="text"
          className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
          placeholder="New Details"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

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