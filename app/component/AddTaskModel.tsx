"use client";
import { useState, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface AddTaskModalProps {
  title: string;
  description: string;
  onAdd: (title: string, description: string, priority: string) => void;
  onClose: () => void;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  plan: string;
  setPlan: (plan: string) => void;
}

const PRIORITIES = [
  { label: "Project Plans", value: "high", color: "bg-red-500" },
  { label: "Planning", value: "normal", color: "bg-yellow-400" },
  { label: "Routine Notes", value: "low", color: "bg-green-400" },
];

export default function AddTaskModal({
  title,
  setTitle,
  onAdd,
  onClose,
  description,
  setDescription,
  plan,
  setPlan,
}: AddTaskModalProps) {
  const defaultPriority =
    PRIORITIES.find((p) => p.value === plan) || PRIORITIES[1];
  const [priority, setPriority] = useState(defaultPriority);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setPlan(priority.value);
  }, [priority, setPlan]);

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
      onAdd(title, description, priority.value);
      onClose();
      router.push("/tasks")
    } else {
      toast.error("Please fill all fields!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-11/12 max-w-lg p-8 shadow-2xl relative">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add Task</h2>

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

        {/* Priority Dropdown */}
        <div className="mb-6 relative">
          <h4 className="text-gray-800 mb-2">Priority</h4>
          <button
            type="button"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 flex justify-between items-center text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span className="flex items-center gap-2">
              <span className={`${priority.color} w-3 h-3 rounded-full`} />
              {priority.label}
            </span>
            <ChevronDownIcon
              className={`w-5 h-5 transition-transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {dropdownOpen && (
            <ul className="absolute z-20 w-full mt-2 bg-white border border-gray-300 rounded-xl shadow-lg">
              {PRIORITIES.map((p) => (
                <li
                  key={p.value}
                  onClick={() => {
                    setPriority(p);
                    setDropdownOpen(false);
                  }}
                  className="px-4 py-3 flex items-center gap-2 cursor-pointer hover:bg-gray-100 transition"
                >
                  <span className={`${p.color} w-3 h-3 rounded-full`} />
                  {p.label}
                </li>
              ))}
            </ul>
          )}
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

        <div className="flex justify-end gap-3">
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
