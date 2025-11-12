"use client";
import { useSession, signOut } from "next-auth/react";
import { CheckSquare, LogOut, Plus } from "lucide-react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Search } from "lucide-react";

export default function Header({ className }: { className?: string }) {
  const { data: session } = useSession();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
          <div
            className={`relative transition-all duration-300 ${
              isSearchOpen ? "w-64 opacity-100" : "w-0 opacity-0"
            }`}
          >
            {isSearchOpen && (
              <input
                type="text"
                placeholder="Find Your Task..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-300"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                autoFocus
              />
            )}
            {isSearchOpen && (
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            )}
          </div>

          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-1 rounded-full text-gray-600 hover:bg-gray-100 transition"
            title={isSearchOpen ? "Close Search" : "Search Tasks"}
          >
            {isSearchOpen ? (
              <XMarkIcon className="w-5 h-5" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </button>

          <button className="text-white bg-gray-800 px-4 py-2 rounded-lg transition flex items-center gap-2 hover:bg-gray-700">
            <Plus className="w-4 h-4 text-white" />
            Add Task
          </button>
        </div>

        {/* {session && (
          <button
            onClick={() => signOut()}
            className="text-gray-800 px-4 py-2 rounded-lg shadow hover:bg-blue-100 transition flex items-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        )} */}
      </div>
    </header>
  );
}
