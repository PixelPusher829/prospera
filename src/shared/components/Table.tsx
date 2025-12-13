// src/shared/components/Table.tsx
import React from "react";
import { ArrowDownUp } from "lucide-react";
import { Checkbox } from "@/shared/components/forms";

export interface Column<T> {
  header: React.ReactNode;
  cell: (row: T) => React.ReactNode;
  accessor: keyof T | string;
  className?: string;
  headerClassName?: string;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  selectedIds: Set<string>;
  toggleSelection: (id: string) => void;
  toggleSelectAll: () => void;
  handleSort: (field: keyof T | string) => void;
  sortField: keyof T | string | null;
  sortDirection: "asc" | "desc";
  renderRowActions?: (row: T) => React.ReactNode;
  actionsColumnClassName?: string;
  onRowClick?: (row: T) => void;
  noItemsMessage?: string;
  getRowId: (row: T) => string;
}

const Table = <T extends {}>({
  data,
  columns,
  selectedIds,
  toggleSelection,
  toggleSelectAll,
  handleSort,
  sortField,
  sortDirection,
  renderRowActions,
  actionsColumnClassName = "w-16",
  onRowClick,
  noItemsMessage = "No items found.",
  getRowId,
}: TableProps<T>) => {
  const allSelected = selectedIds.size === data.length && data.length > 0;

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="overflow-x-auto">
        <div className="w-full text-left" role="table">
          <div role="rowheader">
            <div className="flex items-center border-b border-slate-100 bg-slate-50 dark:border-slate-700 dark:bg-slate-900" role="row">
              <div className="flex-none w-12" role="columnheader">
                <div className="px-6 py-4">
                  <Checkbox
                    checked={allSelected}
                    onChange={toggleSelectAll}
                    className="h-4 w-4 rounded border-slate-200 text-pink-600 focus:ring-pink-500 dark:border-slate-600"
                  />
                </div>
              </div>
              {columns.map((col, index) => (
                <div
                  key={index}
                  className={`flex-1 cursor-pointer px-6 py-4 text-xs font-semibold tracking-wider text-slate-500 uppercase hover:text-slate-700 dark:text-slate-400`}
                  onClick={() => handleSort(col.accessor)}
                  role="columnheader"
                >
                  <div
                    className={`flex items-center gap-1 ${col.headerClassName || ""}`}
                  >
                    {col.header}
                    {sortField === col.accessor && (
                      <ArrowDownUp
                        size={14}
                        className={sortDirection === "desc" ? "rotate-180" : ""}
                      />
                    )}
                  </div>
                </div>
              ))}
              {renderRowActions && (
                <div className={`flex-none ${actionsColumnClassName}`} role="columnheader">
                  <div className="px-6 py-4"></div>
                </div>
              )}
            </div>
          </div>
          <div role="rowgroup">
            {data.length > 0 ? (
              data.map((row) => {
                const id = getRowId(row);
                return (
                  <div
                    key={id}
                    className={`group flex items-center border-b border-slate-100 transition-colors hover:bg-slate-50/50 focus:outline-none dark:border-slate-700 dark:hover:bg-slate-700/50 ${
                      onRowClick ? "cursor-pointer" : ""
                    }`}
                    onClick={() => onRowClick?.(row)}
                    role="row"
                  >
                    <div className="flex-none w-12" role="cell">
                      <div className="px-6 py-4">
                        <Checkbox
                          checked={selectedIds.has(id)}
                          onChange={() => toggleSelection(id)}
                          onClick={(e) => e.stopPropagation()}
                          className="h-4 w-4 rounded border-slate-200 text-pink-600 focus:ring-pink-500 dark:border-slate-600"
                        />
                      </div>
                    </div>
                    {columns.map((col, index) => (
                      <div
                        key={index}
                        className={`flex-1 ${col.className || ''}`}
                        role="cell"
                      >
                        <div className="px-6 py-4">
                          {col.cell(row)}
                        </div>
                      </div>
                    ))}
                    {renderRowActions && (
                      <div className={`flex-none text-center ${actionsColumnClassName}`} role="cell">
                        <div className="px-6 py-4">
                          {renderRowActions(row)}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="flex" role="row">
                <div className="flex-1 py-12 text-center text-slate-500 dark:text-slate-400" role="cell">
                  {noItemsMessage}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
