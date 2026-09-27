"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import Badge from "@/components/ui/Badge";
import Button from "@/app/components/ui/Button";
import DataTable from "@/components/tables/DataTable";
import useProjects from "@/hooks/useProjects";

export default function ProjectsTable() {
  const router = useRouter();
  const { projects, loading, removeProject } = useProjects();
  const currentUser = useSelector((state) => state.auth.user);
  const isSuperAdmin = currentUser?.role === "SUPER_ADMIN";

  const columns = useMemo(
    () => [
      { key: "name", label: "Project" },
      {
        key: "status",
        label: "Status",
        render: (row) => <Badge variant="success">{row.status}</Badge>,
      },
      { key: "client", label: "Client" },
      { key: "manager", label: "Manager" },
      { key: "budget", label: "Budget" },
      { key: "progress", label: "Progress" },
      ...(isSuperAdmin
        ? [
          {
            key: "actions",
            label: "Actions",
            render: (row) => (
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    router.push(`/dashboard/projects/${row.id}/edit`)
                  }
                >
                  Edit
                </Button>

                <Button
                  type="button"
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    if (
                      window.confirm(
                        `Delete project "${row.name}"? This cannot be undone.`
                      )
                    ) {
                      removeProject(row.id);
                    }
                  }}
                >
                  Delete
                </Button>
              </div>
            ),
          },
        ]
        : []),
    ],
    [isSuperAdmin, removeProject]
  );

  return (
    <DataTable
      columns={columns}
      data={projects}
      loading={loading}
      emptyMessage="No projects found."
    />
  );
}