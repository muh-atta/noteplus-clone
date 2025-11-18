"use client";
import { CheckSquare, Plus, Search } from "lucide-react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useUI } from "../context/ContextPage";
import { usePathname } from "next/navigation";
import { Bars3Icon } from "@heroicons/react/24/solid";

export default function Header({
  onClose,
  isCollapsed,
  setIsCollapsed,
}: {
  onClose: () => void;
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { searchQuery, setSearchQuery, setOpenAddModal } = useUI();
  const [search, setSearch] = useState(searchQuery);
  const pathname = usePathname();
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const routeName = pathname.split("/").filter(Boolean).pop() || "Tasks";

  const formattedName = routeName
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 w-full">
      
    <div className="flex justify-between items-center px-4 sm:px-8 md:px-16 lg:px-20 py-5">

          <h1 className="text-lg sm:text-2xl flex items-center gap-2 tracking-wide text-gray-800">
          <Bars3Icon
            className="w-6 h-6 text-gray-800 lg:hidden"
            onClick={toggleCollapse}
          />
          <CheckSquare className="w-6 h-6 text-gray-800 hidden lg:inline" />
          <span className="hidden sm:inline">{formattedName}</span>
        </h1>

        <div className="flex items-center gap-4">
          <div
            className={`relative transition-all duration-300 ${
              isSearchOpen ? "w-64 opacity-100" : "w-0 opacity-0"
            }`}
          >
            {isSearchOpen && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 w-11/12 sm:w-1/3">
            <div className="relative">
              <input
                type="text"
                placeholder="Find Your Task..."
                className="w-full pl-10 pr-4 py-2 bg-white rounded-xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />

      <div className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
      </div>
    </div>
  </div>
)}



          </div>

          <button
            onClick={() => {
              setIsSearchOpen(!isSearchOpen);
              setSearchQuery("");
              setSearch("");
            }}
            className="p-1 rounded-full text-gray-600 hover:bg-gray-100 transition"
            title={isSearchOpen ? "Close Search" : "Search Tasks"}
          >
            {isSearchOpen ? (
              <XMarkIcon className="w-5 h-5" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </button>

          <button
            onClick={() => setOpenAddModal(true)}
            className="text-white bg-gray-800 px-3 py-2 sm:px-4 rounded-lg transition flex items-center gap-1 sm:gap-2 hover:bg-gray-700" // Adjusted padding and gap for mobile
          >
            <Plus className="w-4 h-4 text-white" />
            <span className="hidden sm:inline">Add Task</span>
          </button>
        </div>
      </div>
    </header>
  );
}
