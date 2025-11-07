"use client";
import { useState, useEffect } from "react";
import TaskInput from "../component/TaskInput";
import TaskItem from "../component/TaskItem";
import { Task } from "../types/task";
import Loader from "../component/Loader";

export default function TasksClient() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5; // tasks per page
  const [search, setSearch] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showAddInput, setShowAddInput] = useState(false);
  const [activeTab, setActiveTab] = useState<"add" | "search">("add");


  useEffect(() => {
  const timeout = setTimeout(() => {
    fetchTasks(page, search);
  }, 400);
  return () => clearTimeout(timeout);
}, [page, search]);

  const fetchTasks = async (pageNumber: number, query = "") => {
  setLoading(true);
  const res = await fetch(`/api/tasks?page=${pageNumber}&limit=${pageSize}&q=${query}`);
  const data = await res.json();
  setTasks(data.items);
  setTotalPages(data.totalPages);
  setLoading(false);
};

  const addTask = async (title: string) => {
    if (!title.trim()) return;
    setLoading(true);
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    const task = await res.json();
    if (task) {
      fetchTasks(page);
    }
    else {
      alert("Failed to add task");
    }
  };

  const deleteTask = async (id: string) => {
    setLoading(true);
   const res = await fetch("/api/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res) {
      fetchTasks(page);
    }
    else {
      alert("Failed to delete task");
    }
  };

  const updateTask = async (id: string, title: string) => {
    if (!title.trim()) return;
    setLoading(true);
    const res = await fetch("/api/tasks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, title }),
    });
    const updated = await res.json();
    setLoading(false);
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  const toggleTask = async (id: string) => {
    setLoading(true);
    await fetch("/api/tasks", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchTasks(page);
  };

  return (
    <div className="relative">
      {loading && <Loader />}
      <div
        className={`${
          loading ? "blur-sm pointer-events-none" : ""
        } flex items-center justify-center bg-blue-100 bg-opacity-60 backdrop-blur-sm`}
      >
        <div className="bg-blue-900 flex flex-col min-h-[639px] p-4 sm:p-6 shadow-xl rounded-xl w-full lg:min-w-4xl mx-auto">
          <div className="flex gap-2 mb-4 flex-wrap justify-end">
            <button
              onClick={() => {
                setShowAddInput(true);
                setShowSearchInput(false);
                setActiveTab("add");
              }}
              className={`px-4 py-2 rounded-lg transition font-medium 
              ${
                activeTab === "add"
                  ? "bg-white text-blue-700 border border-blue-700 shadow-md"
                  : "bg-blue-700 text-white hover:bg-blue-600"
              }
            `}
            >
              Add To Do
            </button>

            <button
              onClick={() => {
                setShowSearchInput(true);
                setShowAddInput(false);
                setActiveTab("search");
              }}
              className={`px-4 py-2 rounded-lg transition font-medium
              ${
                activeTab === "search"
                  ? "bg-white text-blue-700 border border-blue-700 shadow-md"
                  : "bg-blue-700 text-white hover:bg-blue-600"
              }
            `}
            >
              Search
            </button>
          </div>
          <div className="flex-1">
            {showSearchInput && (
              <TaskInput
                mode="search"
                search={search}
                setSearch={setSearch}
                setPage={setPage}
              />
            )}

            {showAddInput && <TaskInput mode="add" onAdd={addTask} />}

            <ul className="mt-4 space-y-3">
              {tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onDelete={deleteTask}
                  onUpdate={updateTask}
                  onToggle={toggleTask}
                />
              ))}

              {/* No tasks message */}
              {tasks.length === 0 && !loading && (
                <p className="text-center text-white opacity-80 py-10">
                  No tasks found.
                </p>
              )}
            </ul>
          </div>
          <div className="flex items-center justify-center gap-2 py-6">
            <button
              className="px-4 py-2 rounded-full bg-white hover:bg-gray-100 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={page === 1 || totalPages <= 1}
              onClick={() => setPage(page - 1)}
            >
              ← Previous
            </button>

            <span className="px-4 py-2 text-sm bg-blue-700 text-white rounded-full shadow">
              Page {totalPages > 0 ? page : 0} / {totalPages}
            </span>

            <button
              className="px-4 py-2 rounded-full bg-white hover:bg-gray-100 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={page === totalPages || totalPages <= 1}
              onClick={() => setPage(page + 1)}
            >
              Next →
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
