"use client";
import { useState } from "react";

interface EditTaskModalProps {
  title: string;
  description: string;
  onAdd: () => void;
  onClose: () => void;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
}

export default function AddTaskModal({
  title,
  setTitle,
  onAdd,
  onClose,
  description,
  setDescription,
}: EditTaskModalProps) {
  const handleSave = () => {
    if (title.trim() !== "" && description.trim() !== "") {
      if (title.length > 50) {
        alert("title cant be greater than 50 words");
        return
      }
      if (description.length > 50) {
        alert("description cant be greater than 50 words");
        return
      }
      onAdd();
      onClose();
    } else {
      alert("plz fill all fields");
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-11/12 max-w-sm p-6 shadow-2xl">
        <h2 className="text-xl text-gray-800 mb-6">Add Task</h2>

        <h4 className="text-gray-800 mb-2">Task</h4>

        <textarea
          className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition resize-none"
          placeholder="Add New Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          rows={2}
        ></textarea>

        <h4 className="text-gray-800 mt-2 mb-2">Description</h4>
        <textarea
          className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition resize-none"
          placeholder="Add Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        ></textarea>

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
            Add
          </button>
        </div>
      </div>
    </div>
  );
}