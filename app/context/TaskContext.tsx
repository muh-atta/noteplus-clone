"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { Task } from "../types/task";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  totalPages: number;

  fetchTasks: (page: number, query?: string, type?: string) => Promise<void>;
  addTask: (title: string, description: string, plan: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  updateTask: (id: string, title: string, description: string) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;

  handleSort: (key: string) => void;
}

const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider = ({
  children,
  pageSize = 10,
  type,
}: {
  children: ReactNode;
  userId: string;
  pageSize?: number;
  type: string;
}) => {
  const { data: session, status } = useSession();
  const userId = session?.user?.id ?? null;
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [sortConfig, setSortConfig] = useState<any>(null);

  const fetchTasks = useCallback(
    async (page: number, query = "", type?: string) => {
      if (!userId) return;
      setLoading(true);
      console.log("type....", type);
      const res = await fetch(
        `/api/tasks?page=${page}&limit=${pageSize}&q=${query}&userId=${userId}&filter=${
          type || "all"
        }`
      );

      const data = await res.json();
      setTasks(data.items);
      setTotalPages(data.totalPages);
      setLoading(false);
    },
    [userId, pageSize, type]
  );

  const addTask = useCallback(
    async (title: string, description: string, plan: string, page: number) => {
      if (!title.trim() || !plan.trim() || !userId) return;

      setLoading(true);
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, title, description, plan }),
      });

      if (res.ok) {
        fetchTasks(1);
      } else {
        toast.error("Failed to add task");
      }

      setLoading(false);
    },
    [userId, fetchTasks]
  );

  const deleteTask = useCallback(
    async (id: string, page: number) => {
      if (!userId) return;

      const prevTasks = [...tasks];
      setTasks(prevTasks.filter((t) => t.id !== id));

      try {
        const res = await fetch("/api/tasks", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, userId }),
        });

        if (!res.ok) throw new Error("Delete failed");

        fetchTasks(1);
      } catch {
        toast.error("Failed to delete task");
        setTasks(prevTasks);
      }
    },
    [tasks, userId, fetchTasks]
  );

  const updateTask = useCallback(
    async (id: string, title: string, description: string) => {
      if (!title.trim() || !userId) return;

      const prev = [...tasks];

      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === id ? { ...t, title, description } : t))
      );

      try {
        const res = await fetch("/api/tasks", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, title, description, userId }),
        });
        if (!res.ok) throw new Error("Update failed");
      } catch {
        alert("Failed to update");
        setTasks(prev);
      }
    },
    [tasks, userId]
  );

  const toggleTask = useCallback(
    async (id: string) => {
      if (!userId) return;
      setTasks((prev) => prev.filter((t) => t.id !== id));

      toast.success("Task Mark as Completed");
      try {
        const res = await fetch("/api/tasks", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, userId }),
        });
        if (!res.ok) throw new Error("Toggle failed");
      } catch {
        // revert if failed
        setTasks((prevTasks) =>
          prevTasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
        );
        toast.error("Task not Mark as Completed, an error occured");
      }
    },
    [userId]
  );

  const handleSort = useCallback(
    (key: string) => {
      let direction = "asc";

      if (sortConfig?.key === key && sortConfig.direction === "asc") {
        direction = "desc";
      }

      setSortConfig({ key, direction });

      setTasks((prev) => {
        return [...prev].sort((a, b) =>
          direction === "asc"
            ? a[key]?.localeCompare(b[key])
            : b[key]?.localeCompare(a[key])
        );
      });
    },
    [sortConfig]
  );

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        totalPages,
        fetchTasks,
        addTask,
        deleteTask,
        updateTask,
        toggleTask,
        handleSort,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks must be used inside TaskProvider");
  return ctx;
};
