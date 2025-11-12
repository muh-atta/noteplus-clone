"use client";
import { useState, useEffect } from "react";
import TaskInput from "../component/TaskInput";
import TaskItem from "../component/TaskItem";
import { Task } from "../types/task";
import Loader from "../component/Loader";

export default function TasksClient({ searchTerm }: { searchTerm: string }) {
  console.log("Search Term in TasksClient:", searchTerm);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10; // tasks per page
  const [search, setSearch] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id);
  }, []);

  useEffect(() => {
    if (!userId) return;

    const timeout = setTimeout(() => {
      fetchTasks(page, searchTerm);
    }, 400);

    return () => clearTimeout(timeout);
  }, [page, searchTerm, userId]);

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
    <div>
      {loading && <Loader />}
      <div
        className={`${
          loading ? "blur-sm pointer-events-none" : ""
        } min-h-screen bg-white rounded-xl`}
      >
        {/* <div className="mb-4">
          <TaskInput
            mode="search"
            search={search}
            setSearch={setSearch}
            setPage={setPage}
            onAdd={addTask}
          />
        </div> */}
        {/*Table  */}
        <div className=" rounded-lg overflow-hidden bg-white px-8 py-8">
          <div className="overflow-x-auto">
            <table className="min-w-max lg:min-w-full md:min-w-full rounded-2xl">
              <thead className="bg-gray-800 text-white border-2 rounded-xl">
                <tr>
                  <th
                    scope="col"
                    className="px-8 py-3 **text-center** text-md font-semibold uppercase tracking-wider first:rounded-tl-xl"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 **text-center** text-md font-semibold uppercase tracking-wider"
                  >
                    Created By
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 **text-center** text-md font-semibold uppercase tracking-wider"
                  >
                    Updated
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 **text-center** text-md font-semibold uppercase tracking-wider"
                  >
                    Shared With
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 **text-center** text-md font-semibold uppercase tracking-wider last:rounded-tr-xl"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 py-6">
                {tasks.length > 0 &&
                  tasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onDelete={deleteTask}
                      onUpdate={updateTask}
                      onToggle={toggleTask}
                    />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 py-6">
          <button
            className="px-4 py-2 rounded-full bg-white hover:bg-gray-100 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed border border-gray-300"
            disabled={page === 1 || totalPages <= 1}
            onClick={() => setPage(page - 1)}
          >
            ← Previous
          </button>

          <span className="px-4 py-2 text-md font-semibold bg-gray-800 text-white rounded-full shadow">
            Page {totalPages > 0 ? page : 0} / {totalPages}
          </span>

          <button
            className="px-4 py-2 rounded-full bg-white hover:bg-gray-100 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed border border-gray-300"
            disabled={page === totalPages || totalPages <= 1}
            onClick={() => setPage(page + 1)}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
