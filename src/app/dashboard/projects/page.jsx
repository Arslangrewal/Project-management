"use client";

import ProjectFilters from "@/components/projects/ProjectFilters";
import ProjectStats from "@/components/projects/ProjectStats";
import ProjectsTable from "@/components/projects/ProjectsTable";
import Pagination from "@/components/pagination/Pagination";
import useProjects from "@/hooks/useProjects";

export default function ProjectsPage() {
  const { pagination, totalPages, changePage } = useProjects();
  const changePageSize = (size) => {
    setPagination((prev) => ({
      ...prev,
      pageSize: size,
      currentPage: 1,
    }));
  };
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Projects</h2>
        <p className="text-sm text-gray-500">
          Track delivery progress, budgets, and project health.
        </p>
      </div>

      <ProjectStats />
      <ProjectFilters />
      <ProjectsTable />

      <Pagination
        currentPage={pagination.currentPage}
        totalPages={totalPages}
        pageSize={pagination.pageSize}
        totalItems={pagination.totalItems}
        onPageChange={changePage}
        onPageSizeChange={changePageSize}
      />
    </div>
  );
}
