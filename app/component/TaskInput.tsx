"use client";
import { useState } from "react";
import { Search, PlusCircle } from "lucide-react";

export default function TaskInput({
  mode,
  onAdd,
  search,
  setSearch,
  setPage
}: {
  mode: "search" | "add";
  onAdd?: (title: string) => void;
  search?: string;
  setSearch?: (v: string) => void;
  setPage?: (v: number) => void;
}) {
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (!title.trim()) return;
    onAdd?.(title);
    setTitle("");
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md flex flex-col md:flex-row items-center gap-4 border border-gray-200">
    {mode === "search" && (
      <div className="relative w-full md:w-1/2">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          value={search}
          onChange={(e) => {
            setSearch?.(e.target.value);
            setPage?.(1);
          }}
          placeholder="Search tasks..."
          className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
        />
      </div>
    )}

  {mode === "add" && (
    <div className="flex w-full md:w-1/2 items-center gap-2">
      <input
        placeholder="Add a new task..."
        className="flex-1 p-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && title.trim()) {
            handleAdd();
          }
        }}
      />

      <button
        className="px-5 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 flex items-center gap-2"
        onClick={handleAdd}
      >
        <PlusCircle size={18} />
        Add
      </button>
    </div>
  )}
    </div>
  );
}
