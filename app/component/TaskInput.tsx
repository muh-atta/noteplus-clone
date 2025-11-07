"use client";
import { useState } from "react";
import { Search, PlusCircle } from "lucide-react";

export default function TaskInput({
  onAdd,
  search,
  setSearch,
  setPage,
}: {
  mode: "search" | "add";
  onAdd?: (title: string) => void;
  search?: string;
  setSearch?: (v: string) => void;
  setPage?: (v: number) => void;
}) {
  const [title, setTitle] = useState("");
  const [searchText, setSearchText] = useState("");

  const handleAdd = () => {
    const trimmed = title.trim();

    if (!trimmed) return alert("Task cannot be empty.");
    if (trimmed.length > 200) return alert("Task limit is 1–200 characters.");
    onAdd?.(trimmed);
    setTitle("");
  };

  const handleSearch = () => {
    const trimmed = searchText.trim();
        if (!trimmed) return alert("Search cannot be empty.");

    setSearch?.(searchText); // send value to parent search state
    setPage?.(1);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md flex flex-col gap-4 border border-gray-200">
  {/* Search Row */}
  <div className="flex flex-col md:flex-row items-center gap-3 w-full">
    <div className="relative flex-1 w-full">
      <Search className="absolute left-3 top-3 text-gray-400" size={18} />
      <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search tasks..."
        className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
      />
    </div>

    <button
      className="px-5 py-3 bg-blue-700 text-white font-semibold rounded-lg shadow hover:bg-blue-600 flex items-center gap-2 w-full md:w-40 justify-center"
      onClick={handleSearch}
    >
      <Search size={18} />
      Search
    </button>
  </div>

  {/* Add Task Row */}
  <div className="flex flex-col md:flex-row items-center gap-3 w-full">
    <div className="relative flex-1 w-full">
      <PlusCircle className="absolute left-3 top-3 text-gray-400" size={20} />
      <input
        placeholder="Add a new task..."
        className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 bg-gray-50
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && title.trim() && handleAdd()}
      />
    </div>

    <button
      className="px-5 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-500 flex items-center gap-2 w-full md:w-40 justify-center"
      onClick={handleAdd}
    >
      <PlusCircle size={18} />
      Add
    </button>
  </div>
</div>

  );
}
