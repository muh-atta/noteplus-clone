"use client";
import { useState, useEffect } from "react";
import TaskItem from "../component/TaskItem";
import { useUI } from "../context/ContextPage";
import AddTaskModal from "../component/AddTaskModel";
import { useRouter } from "next/navigation";
import Table from "../component/Table";
import { useTasks } from "../context/TaskContext";
import Pagination from "../component/Pagination";

export default function TasksClient() {
  const [userId, setUserId] = useState<string | null>(null);
  const { searchQuery, openAddModal, setOpenAddModal } = useUI();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [plan, setPlan] = useState("");
  const {
    tasks,
    loading,
    totalPages,
    fetchTasks,
    addTask,
    deleteTask,
    updateTask,
    toggleTask,
    handleSort,
    sortConfig,
    page
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
      fetchTasks(page, searchQuery, 'all');
    }, 400);

    return () => clearTimeout(timeout);
  }, [page, searchQuery, userId]);

  return (
    <div className=" flex flex-col bg-gray-100 p-4 gap-12">
      <div className="flex-1 bg-gray-50 flex flex-col">
        <Table
          data={tasks.filter((t) => t.done === false && t.status === false)}
          loading={loading}
          sortConfig={sortConfig}
          onSort={handleSort}
          page={totalPages}
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

       <>
        {totalPages > 1 && (
          <Pagination/>
        )}
        </>

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
