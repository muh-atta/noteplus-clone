"use client";
import SkeletonRow from "./Skeleton";

const columns = [
  { key: "title", label: "Title", sortable: true },
  { key: "description", label: "Description", sortable: true },
  { key: "createdBy", label: "Created By" },
  { key: "updated", label: "Updated" },
  { key: "action", label: "Action" },
];

export default function Table({
  data,
  loading,
  sortConfig,
  onSort,
  renderRow,
  page,
}: {
  data: any[];
  loading: boolean;
  sortConfig?: { key: string; direction: "asc" | "desc" } | null;
  onSort?: (key: string) => void;
  skeletonCount?: number;
  renderRow: (row: any) => React.ReactNode;
  page: number;
}) {
  const getSortIcon = (colKey: string) => {
    if (!sortConfig || sortConfig.key !== colKey) return "";
    return sortConfig.direction === "asc" ? "↑" : "↓";
  };

  return (
    <div className="bg-white shadow-md flex flex-col">
      <div
        className={`overflow-x-auto w-full custom-scroll-hide ${
          page > 1 ? "h-[calc(100vh-300px)]" : "h-[calc(100vh-200px)]"
        }`}
      >
        <table className="min-w-[700px] md:min-w-full w-full rounded-xl table-fixed">
          <thead className="bg-gray-800 text-white">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={col.key}
                  className={`
                    px-4 py-3 text-center cursor-pointer select-none
                    ${index === 0 ? "" : ""} 
                    ${index === columns.length - 1 ? "" : ""}
                  `}
                  onClick={() => col.sortable && onSort?.(col.key)}
                >
                  <div className="flex justify-center items-center gap-1">
                    <span>{col.label}</span>
                    {col.sortable && (
                      <span className="text-sm">{getSortIcon(col.key)}</span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {loading
              ? Array.from({ length: 10 }).map((_, i) => <SkeletonRow key={i} />)
              : data.length === 0
              ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="py-6 text-center text-gray-500 text-lg"
                  >
                    No data found
                  </td>
                </tr>
              )
              : data.map((item) => renderRow(item))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
