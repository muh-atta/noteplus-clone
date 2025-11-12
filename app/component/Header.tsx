"use client";
import { useSession, signOut } from "next-auth/react";
import { CheckSquare, LogOut, Plus, Search } from "lucide-react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useUI } from "../context/page";

export default function Header({ className }: { className?: string }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { searchQuery, setSearchQuery, setOpenAddModal } = useUI();
  const [search, setSearch] = useState(searchQuery);
  return (
    <header
      className={`bg-white shadow-md border-b border-r border-gray-200 rounded-xl mx-auto ${className}`}
    >
      <div className="flex justify-between items-center px-4 py-5">
        <h1 className="text-lg sm:text-2xl tracking-wide flex items-center gap-2 text-gray-800">
          <CheckSquare className="w-6 h-6 text-gray-800" />
          Tasks
        </h1>

        <div className="flex items-center gap-4">
          {/* Search Input */}
          <div
            className={`relative transition-all duration-300 ${
              isSearchOpen ? "w-64 opacity-100" : "w-0 opacity-0"
            }`}
          >
            {isSearchOpen && (
              <div className="relative transition-all duration-300">
                <input
                  type="text"
                  placeholder="Find Your Task..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-300"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setSearchQuery(search.trim())}
                  className={`
    absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full transition
    ${
      search.trim()
        ? "bg-gray-600 text-white"
        : "hover:bg-gray-200 text-gray-500 hover:text-black"
    }
  `}
                >
                  <MagnifyingGlassIcon
                    className={`h-5 w-5 transition ${
                      searchQuery.trim() ? "text-black" : "text-gray-500"
                    }`}
                  />
                </button>
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
            className="text-white bg-gray-800 px-4 py-2 rounded-lg transition flex items-center gap-2 hover:bg-gray-700"
          >
            <Plus className="w-4 h-4 text-white" />
            Add Task
          </button>
        </div>
      </div>
    </header>
  );
}
