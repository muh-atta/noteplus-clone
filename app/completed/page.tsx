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
  const { searchQuery, openAddModal, setOpenAddModal } = useUI();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [plan, setPlan] = useState("");
  const {
    tasks,
    loading,
    fetchTasks,
    addTask,
    deleteTask,
    updateTask,
    toggleTask,
    handleSort,
    page,
    totalPages,
    sortConfig
  } = useTasks();


  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchTasks(page, searchQuery, "done");
    }, 400);
    return () => clearTimeout(timeout);
  }, [page, searchQuery]);

  return (
    <div className=" flex flex-col bg-gray-100 gap-5 p-4">
      <div className="flex-1 bg-gray-50 flex flex-col">
        <Table
          data={tasks.filter((t) => t.done === true)}
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
              showToggleActions={false}
              showDeleteActions={true}
              showEditActions={false}
            />
          )}
        />
      </div>
      <div>
      <>
      {totalPages > 1 && (
            <Pagination/>
            )}</>
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
