"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import TaskInput from "../component/TaskInput";
import TaskItem from "../component/TaskItem";
import { Task } from "../types/task";

export default function TasksClient() {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5; // tasks per page
  const [search, setSearch] = useState("");

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
    const res = await fetch("/api/tasks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, title }),
    });
    const updated = await res.json();
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

  if (!session)
    return <p className="text-center mt-10 text-gray-500">Please login</p>;

  return (
    <div className="relative">

      {/* Loader Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-white/70 backdrop-blur-md flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Blur content when loading */}
      <div className={`${loading ? "blur-sm pointer-events-none" : ""} w-full mx-auto p-8 mt-10`}>
        <div className="bg-white shadow rounded-xl p-6">

          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center justify-center w-full mb-4">
              <h1 className="text-3xl font-bold text-blue-600 underline">My Todos</h1>
            </div>

            <button
              onClick={() => { signOut(); setLoading(true)}}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </div>

          <TaskInput
            onAdd={addTask}
            search={search}
            setSearch={setSearch}
            setPage={setPage}
          />

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
          </ul>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              className="px-4 py-2 rounded-full border bg-white hover:bg-gray-100 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={page === 1 || totalPages <= 1}
              onClick={() => setPage(page - 1)}
            >
              ← Previous
            </button>

            <span className="px-4 py-2 text-sm bg-blue-500 text-white rounded-full shadow">
              Page {totalPages > 0 ? page : 0} / {totalPages}
            </span>

            <button
              className="px-4 py-2 rounded-full border bg-white hover:bg-gray-100 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
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
