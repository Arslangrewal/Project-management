"use client";

import Card from "@/app/components/ui/Card";
import useProjects from "@/hooks/useProjects";

const statsConfig = [
  {
    key: "total",
    title: "Total Projects",
    color: "text-blue-600",
  },
  {
    key: "active",
    title: "Active",
    color: "text-green-600",
  },
  {
    key: "planning",
    title: "Planning",
    color: "text-yellow-600",
  },
  {
    key: "completed",
    title: "Completed",
    color: "text-indigo-600",
  },
  {
    key: "onHold",
    title: "On Hold",
    color: "text-orange-600",
  },
  {
    key: "cancelled",
    title: "Cancelled",
    color: "text-red-600",
  },
];

export default function ProjectStats() {
  const { statistics, loading } = useProjects();

  return (
    <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
      {statsConfig.map((item) => (
        <Card
          key={item.key}
          className="p-5 transition-all duration-200 hover:shadow-md"
        >
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500">
              {item.title}
            </p>

            <h2
              className={`text-3xl font-bold ${item.color}`}
            >
              {loading
                ? "..."
                : statistics[item.key]}
            </h2>
          </div>
        </Card>
      ))}
    </section>
  );
}