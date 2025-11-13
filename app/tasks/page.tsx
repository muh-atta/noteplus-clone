"use client";
import { useState, useEffect } from "react";
import TaskItem from "../component/TaskItem";
import { Task } from "../types/task";
import Loader from "../component/Loader";
import { useUI } from "../context/ContextPage";
import AddTaskModal from "../component/AddTaskModel";

export default function TasksClient() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;
  const [userId, setUserId] = useState<string | null>(null);
  const { searchQuery, openAddModal, setOpenAddModal } = useUI();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id);
  }, []);

  useEffect(() => {
    if (!userId) return;

    const timeout = setTimeout(() => {
      fetchTasks(page, searchQuery);
    }, 400);

    return () => clearTimeout(timeout);
  }, [page, searchQuery, userId]);

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

  const addTask = async () => {
    if (!title.trim() || !userId) return;
    setOpenAddModal(false);
    setLoading(true);
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, title, description }),
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

  const updateTask = async (id: string, title: string, description: string) => {
    if (!title.trim() || !userId) return;
    setLoading(true);
    const res = await fetch("/api/tasks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, title, description, userId }),
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
    <div>
      {loading && <Loader />}
      <div className=" min-h-screen bg-white rounded-xl">
          <div className="overflow-x-auto">
          <table className=" w-full">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-8 py-3 text-center first:rounded-tl-xl">
                  Title
                </th>
                <th className="px-6 py-3 text-center">Description</th>
                <th className="px-6 py-3 text-center">Created By</th>
                <th className="px-6 py-3 text-center">Updated</th>
                <th className="px-6 py-3 text-center last:rounded-tr-xl">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 py-6">
              {tasks.length === 0 && !loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-20">
                    <p className="text-gray-500 text-lg font-medium">
                      No tasks exist. Add your first task!
                    </p>
                  </td>
                </tr>
              ) : (
                tasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onDelete={deleteTask}
                    onUpdate={updateTask}
                    onToggle={toggleTask}
                  />
                ))
              )}
            </tbody>
            </table>
            </div>
        </div>
        {totalPages > 1 && (
          <div className="relative h-full bottom-0 left-0 w-full flex justify-center items-center gap-2 py-4 bg-gray-50 border-t border-gray-200 z-10">
            <button
              className="px-4 py-2 rounded-full bg-white hover:bg-gray-100 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed border border-gray-300"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              ← Previous
            </button>

            <span className="px-4 py-2 text-md font-semibold bg-gray-800 text-white rounded-full shadow">
              Page {page} / {totalPages}
            </span>

            <button
              className="px-4 py-2 rounded-full bg-white hover:bg-gray-100 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed border border-gray-300"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next →
            </button>
          </div>
        )}

      {openAddModal && (
        <AddTaskModal
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          onAdd={addTask}
          onClose={() => {
            setOpenAddModal(false);
            setTitle("");
            setDescription("");
          }}
        />
      )}
    </div>
  );
}
