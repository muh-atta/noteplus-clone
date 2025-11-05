"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import TaskInput from "../component/TaskInput";
import TaskItem from "../component/TaskItem";

type Task = { id: string; title: string };

export default function TasksClient() {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5; // tasks per page

  useEffect(() => {
    fetchTasks(page);
  }, [page]);

  const fetchTasks = async (pageNumber: number) => {
    setLoading(true);
    const res = await fetch(`/api/tasks?page=${pageNumber}&limit=${pageSize}`);
    const data = await res.json();
    setTasks(data.items);
    setTotalPages(data.totalPages);
    setLoading(false);
  };

  const addTask = async (title: string) => {
    if (!title.trim()) return;
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    const task = await res.json();
    setTasks((prev) => [task, ...prev]);
  };

  const deleteTask = async (id: string) => {
    await fetch("/api/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setTasks((prev) => prev.filter((t) => t.id !== id));
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

      <TaskInput onAdd={addTask} />

      <ul className="mt-6 space-y-4">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onUpdate={updateTask}
          />
        ))}
      </ul>

      {/* Pagination */}
      <div className="flex justify-center gap-3 mt-6">
        <button
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </button>
        <span className="px-3 py-1 bg-white border rounded">
          Page {page} of {totalPages}
        </span>
        <button
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition disabled:opacity-50"
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
