"use client";
import SkeletonRow from "./Skeleton";
export default function Table({
  columns,
  data,
  loading,
  sortConfig,
  onSort,
  renderRow,
}: {
  columns: {
    key: string;
    label: string;
    sortable?: boolean;
    className?: string;
  }[];
  data: any[];
  loading: boolean;
  sortConfig?: { key: string; direction: "asc" | "desc" } | null;
  onSort?: (key: string) => void | undefined | undefined;
  skeletonCount?: number;
  renderRow: (row: any) => React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl shadow-md flex flex-col">
      <div className="overflow-auto h-[calc(100vh-300px)]">
        <table className="w-full rounded-xl table-fixed">
          <thead className="bg-gray-800 text-white">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={col.key}
                  className={`
            px-4 py-3 text-center 
            w-auto
            ${col.className || ""}
            ${index === 0 ? "rounded-l-2xl" : ""} 
            ${index === columns.length - 1 ? "rounded-r-2xl" : ""}
          `}
                  onClick={() => col.sortable && onSort?.(col.key)}
                >
                  {col.label}
                  {col.sortable && sortConfig?.key === col.key
                    ? sortConfig.direction === "asc"
                      ? " ↑"
                      : " ↓"
                    : ""}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {loading ? (
              Array.from({ length: 10 }).map((_, i) => <SkeletonRow key={i} />)
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-6 text-center text-gray-500 text-lg"
                >
                  No data found
                </td>
              </tr>
            ) : (
              data.map((item) => renderRow(item))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
