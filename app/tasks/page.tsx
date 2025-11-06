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
    fetchTasks(page);
  }, [page]);

  const fetchTasks = async (pageNumber: number, query = "") => {
    setLoading(true);
    const res = await fetch(
      `/api/tasks?page=${pageNumber}&limit=${pageSize}&q=${query}`
    );
    const data = await res.json();
    setTasks(data.items);
    setTotalPages(data.totalPages);
    setLoading(false);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchTasks(page, search);
    }, 400);

    return () => clearTimeout(timeout);
  }, [search, page]);

  const addTask = async (title: string) => {
    if (!title.trim()) return;
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
    const res = await fetch("/api/tasks", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const updated = await res.json();

    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  if (!session)
    return <p className="text-center mt-10 text-gray-500">Please login</p>;
  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading tasks...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-50 rounded-xl shadow-xl mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900">My Tasks</h1>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-md transition"
          onClick={() => signOut()}
        >
          Logout
        </button>
      </div>

      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        placeholder="Search tasks..."
        className="w-full p-2 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-500 shadow-sm"
      />

      <TaskInput onAdd={addTask} />

      <ul className="mt-6 space-y-4">
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
          className="flex items-center gap-2 px-4 py-2 rounded-full border bg-white text-gray-600 hover:bg-gray-100 hover:text-black transition shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          ← Previous
        </button>

        <span className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-full shadow">
          Page {page} / {totalPages}
        </span>

        <button
          className="flex items-center gap-2 px-4 py-2 rounded-full border bg-white text-gray-600 hover:bg-gray-100 hover:text-black transition shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
