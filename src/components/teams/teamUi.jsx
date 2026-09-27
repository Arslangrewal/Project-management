"use client";

const statusStyles = {
  Active: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Planning: "bg-amber-100 text-amber-700 border-amber-200",
  "On Hold": "bg-orange-100 text-orange-700 border-orange-200",
  Completed: "bg-blue-100 text-blue-700 border-blue-200",
  Cancelled: "bg-red-100 text-red-700 border-red-200",
  Archived: "bg-gray-100 text-gray-600 border-gray-200",
};

export function TeamColorDot({ color, size = "md" }) {
  const sizes = {
    sm: "h-2.5 w-2.5",
    md: "h-3.5 w-3.5",
    lg: "h-10 w-10",
  };

  return (
    <span
      className={`inline-block shrink-0 rounded-full border border-white shadow-sm ring-1 ring-gray-200 ${sizes[size]}`}
      style={{ backgroundColor: color || "#3B82F6" }}
    />
  );
}

export function ProjectChip({
  name,
  status,
  assigned = false,
  compact = false,
}) {
  return (
    <div
      className={`
        inline-flex
        items-center
        gap-5
        rounded-lg
        border
        px-3
        py-2
        text-xs
        font-medium
        whitespace-nowrap
        ${
          assigned
            ? "border-blue-200 bg-blue-50 text-blue-800"
            : "border-gray-200 bg-gray-50 text-gray-700"
        }
        ${compact ? "max-w-[220px]" : ""}
      `}
    >
      <span className="truncate font-medium">
        {name}
      </span>

      {status && (
        <span
          className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
            statusStyles[status] ||
            "bg-gray-100 text-gray-600 border-gray-200"
          }`}
        >
          {status}
        </span>
      )}
    </div>
  );
}

export function ProjectChipList({
  projects = [],
  emptyText = "No projects assigned",
  maxVisible = 3,
  assigned = true,
}) {
  if (!projects.length) {
    return (
      <span className="text-sm text-gray-400">{emptyText}</span>
    );
  }

  const visible = projects.slice(0, maxVisible);
  const remaining = projects.length - visible.length;

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {visible.map((project) => (
        <ProjectChip
          key={project.id}
          name={project.name}
          status={project.status}
          assigned={assigned}
          compact
        />
      ))}

      {remaining > 0 && (
        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
          +{remaining} more
        </span>
      )}
    </div>
  );
}

export function MemberBadge({ count }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-100 text-[10px] font-bold">
        {count}
      </span>
      {count === 1 ? "member" : "members"}
    </span>
  );
}
