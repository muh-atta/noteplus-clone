"use client";
import { useState, useEffect } from "react";
import TaskItem from "../component/TaskItem";
import { useUI } from "../context/ContextPage";
import AddTaskModal from "../component/AddTaskModel";
import { useRouter } from "next/navigation";
import Table from "../component/Table";
import { useTasks } from "../context/TaskContext";
type SortKey = "title" | "description" | "updated";
type SortDirection = "asc" | "desc";

export default function TasksClient() {
  const [page, setPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: SortDirection;
  } | null>(null);
  const pageSize = 10;
  const [userId, setUserId] = useState<string | null>(null);
  const { searchQuery, openAddModal, setOpenAddModal } = useUI();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [plan, setPlan] = useState("");
  const {
    tasks,
    loading,
    fetchTasks,
    totalPages,
    addTask,
    deleteTask,
    updateTask,
    toggleTask,
    handleSort,
  } = useTasks();

  const router = useRouter();
  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (!id) {
      router.push("/login");
    }
    setUserId(id);
  }, []);

  useEffect(() => {
    if (!userId) return;

    const timeout = setTimeout(() => {
      fetchTasks(page, searchQuery, "project");
    }, 400);

    return () => clearTimeout(timeout);
  }, [page, searchQuery, userId]);

  return (
    <div className=" flex flex-col bg-gray-100 p-4 gap-12">
      <div className="flex-1 bg-gray-50 flex flex-col">
        <Table
          columns={[
            { key: "title", label: "Title", sortable: true },
            { key: "description", label: "Description", sortable: true },
            { key: "createdBy", label: "Created By" },
            { key: "updated", label: "Updated", sortable: true },
            { key: "action", label: "Action" },
          ]}
          data={tasks}
          loading={loading}
          sortConfig={sortConfig}
          onSort={handleSort}
          renderRow={(task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={deleteTask}
              onUpdate={updateTask}
              onToggle={toggleTask}
              showToggleActions={true}
              showDeleteActions={true}
              showEditActions={true}
            />
          )}
        />
      </div>

      <div className="flex justify-center items-center gap-4">
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

      {openAddModal && (
        <AddTaskModal
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          plan={plan}
          setPlan={setPlan}
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
