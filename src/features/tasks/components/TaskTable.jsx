"use client";

import { useMemo } from "react";
import { CalendarDays, CheckCircle2 } from "lucide-react";

import Button from "@/app/components/ui/Button";
import Badge from "@/components/ui/Badge";
import PriorityBadge from "@/features/tasks/components/PriorityBadge";

const taskStatusStyles = {
  "To Do": "bg-yellow-100 text-yellow-800 border border-yellow-200",
  "In Progress": "bg-blue-100 text-blue-700 border border-blue-200",
  Review: "bg-indigo-100 text-indigo-700 border border-indigo-200",
  Completed: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  Blocked: "bg-red-100 text-red-700 border border-red-200",
};

export default function TaskTable({ tasks = [], onEdit, onDelete }) {
  const columns = useMemo(
    () => [
      { key: "title", label: "Task" },
      { key: "project", label: "Project" },
      { key: "assignee", label: "Assignee" },
      {
        key: "status",
        label: "Status",
        render: (row) => (
          <Badge variant={row.status === "Completed" ? "success" : row.status === "Blocked" ? "danger" : "info"}>
            {row.status}
          </Badge>
        ),
      },
      {
        key: "priority",
        label: "Priority",
        render: (row) => <PriorityBadge value={row.priority} />,
      },
      {
        key: "dueDate",
        label: "Due Date",
        render: (row) => (
          <span className="inline-flex items-center gap-2 text-sm text-slate-600">
            <CalendarDays className="h-4 w-4 text-slate-400" />
            {row.dueDate || "—"}
          </span>
        ),
      },
      {
        key: "actions",
        label: "Actions",
        render: (row) => (
          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => onEdit?.(row)}>
              Edit
            </Button>
            <Button
              type="button"
              variant="danger"
              size="sm"
              onClick={() => onDelete?.(row.id)}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ],
    [onDelete, onEdit]
  );

  if (!tasks.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-12 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-slate-400" />
        <h3 className="mt-4 text-lg font-semibold text-slate-800">No tasks yet</h3>
        <p className="mt-2 text-sm text-slate-500">Create a new task to start tracking your team workload.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-4 py-3 font-medium">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id || task.title} className="border-t border-slate-200 align-top">
                <td className="px-4 py-4">
                  <div className="space-y-1">
                    <p className="font-semibold text-slate-900">{task.title}</p>
                    <p className="text-xs text-slate-500">{task.description || "No description provided"}</p>
                  </div>
                </td>
                <td className="px-4 py-4 text-slate-700">{task.project || "—"}</td>
                <td className="px-4 py-4 text-slate-700">{task.assignee || "Unassigned"}</td>
                <td className="px-4 py-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${taskStatusStyles[task.status] || "bg-gray-100 text-gray-600 border border-gray-200"}`}>
                    {task.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <PriorityBadge value={task.priority} />
                </td>
                <td className="px-4 py-4 text-slate-600">{task.dueDate || "—"}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <Button type="button" variant="outline" size="sm" onClick={() => onEdit?.(task)}>
                      Edit
                    </Button>
                    <Button type="button" variant="danger" size="sm" onClick={() => onDelete?.(task.id)}>
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
