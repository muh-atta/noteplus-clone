"use client";

import { useTasks } from "../context/TaskContext";

export default function Pagination() {
  const { page, setPage, totalPages } = useTasks();

  // fixed width for buttons
  const buttonClasses =
    "w-32 px-4 py-2 rounded-full font-medium text-center transition-colors duration-200 border";

  return (
    <div className="flex justify-center items-center gap-4 my-5">
      <button
        className={`${buttonClasses} ${
          page === 1
            ? "bg-gray-300 text-gray-600 cursor-not-allowed border-gray-300"
            : "bg-white text-black border-none"
        }`}
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        ← Previous
      </button>

      <span className="px-4 py-2 text-md font-semibold bg-gray-800 text-white rounded-full shadow">
        Page {page} / {totalPages}
      </span>

      <button
        className={`${buttonClasses} ${
          page === totalPages
            ? "bg-gray-300 text-gray-600 cursor-not-allowed border-gray-300"
            : "bg-white text-black border-none"
        }`}
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      >
        Next →
      </button>
    </div>
  );
}
