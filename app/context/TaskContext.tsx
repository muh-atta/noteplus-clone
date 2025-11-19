"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
import { Task } from "../types/task";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
type SortKey = "title" | "description";

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  totalPages: number;
  page: number;
  sortConfig: { key: string; direction: "asc" | "desc"; };
  setPage: Dispatch<SetStateAction<number>>;
  fetchTasks: (page: number, query?: string, type?: string) => Promise<void>;
  addTask: (title: string, description: string, plan: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  updateTask: (id: string, title: string, description: string) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;

  handleSort: (SortKey: any) => void;
}

const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider = ({
  children,
  pageSize = 10,
  type,
}: {
  children: ReactNode;
  pageSize?: number;
  type: string;
}) => {
  const { data: session, status } = useSession();
  let userId = session?.user?.id ?? null;
  const [tasks, setTasks] = useState<Task[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [sortConfig, setSortConfig] = useState<any>({ key: 'title', direction: "asc"});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(
    async (page: number, query = "", type?: string) => {
      console.log("called")
      setTasks([])
      setLoading(true);

      if (!userId) {
        const id = localStorage.getItem("userId");
        if (!id) {
                setLoading(false);
        window.location.href  = "/login"
          return;
        }
        userId = id;
      }
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
    async (title: string, description: string, plan: string) => {
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
    async (id: string) => {
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
        toast.success("Deleted successfully");
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
        toast.success("Updated successfully");
      } catch {
        toast.error("Failed to update");
        setTasks(prev);
      }
    },
    [tasks, userId]
  );

  const toggleTask = useCallback(
    async (id: string) => {
      if (!userId) return;
      setTasks((prev) => prev.filter((t) => t.id !== id));

      try {
        const res = await fetch("/api/tasks", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, userId }),
        });
        if (!res.ok) throw new Error("Toggle failed");
        toast.success("Task Mark as Completed");
      } catch {
        setTasks((prevTasks) =>
          prevTasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
        );
        toast.error("An error occured");
      }
    },
    [userId]
  );

  const handleSort = (key: SortKey) => {
    let direction: "asc" | "desc" = "asc";

    if (sortConfig?.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });

    const getValue = (task: Task) => {
      switch (key) {
        case "title":
          return task.title;
        case "description":
          return task.description;
        default:
          return "";
      }
    };

    setTasks((prev) =>
      [...prev].sort((a, b) => {
        const aVal = getValue(a);
        const bVal = getValue(b);
        return direction === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      })
    );
  };

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
        page,
        setPage,
        sortConfig,
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
