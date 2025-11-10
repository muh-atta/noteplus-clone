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
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id);
  }, []);

  useEffect(() => {
  if (!userId) return;

  const timeout = setTimeout(() => {
    fetchTasks(page, search);
  }, 400);

  return () => clearTimeout(timeout);
  }, [page, search, userId]);


  const fetchTasks = async (pageNumber: number, query = "") => {
    setLoading(true);
    const res = await fetch(
      `/api/tasks?page=${pageNumber}&limit=${pageSize}&q=${query}&userId=${userId}`
    );
    const data = await res.json();
    setTasks(data.items);
    setTotalPages(data.totalPages);
    setLoading(false);
  };

  const addTask = async (title: string) => {
    if (!title.trim() || !userId) return;
    setLoading(true);
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, title }),
    });
    const task = await res.json();
    if (task) {
      fetchTasks(page);
    } else {
      alert("Failed to add task");
    }
  };

  const deleteTask = async (id: string) => {
  if (!userId) return;
    setLoading(true);
    const res = await fetch("/api/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, userId }),
    });
    if (res) {
      fetchTasks(page);
    } else {
      alert("Failed to delete task");
    }
  };

  const updateTask = async (id: string, title: string) => {
    if (!title.trim() || !userId) return;
    setLoading(true);
    const res = await fetch("/api/tasks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, title, userId }),
    });
    const updated = await res.json();
    setLoading(false);
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  const toggleTask = async (id: string) => {
    if (!userId) return;
    setLoading(true);
    await fetch("/api/tasks", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, userId }),
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
          <div className="flex-1">
            <TaskInput
              mode="search"
              search={search}
              setSearch={setSearch}
              setPage={setPage}
              onAdd={addTask}
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
