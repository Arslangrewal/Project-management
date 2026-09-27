"use client";

import { FolderKanban, Users, UserCheck, Layers } from "lucide-react";

export default function TeamStats({ teams = [] }) {
  const totalTeams = teams.length;

  const activeTeams = teams.filter(
    (team) => team.status === "ACTIVE"
  ).length;

  const totalMembers = teams.reduce(
    (total, team) => total + (team.members?.length || 0),
    0
  );

  const assignedProjects = new Set(
    teams.flatMap((team) => team.projects || [])
  ).size;

  const stats = [
    {
      title: "Total Teams",
      value: totalTeams,
      icon: Layers,
      tone: "text-blue-600 bg-blue-50",
    },
    {
      title: "Active Teams",
      value: activeTeams,
      icon: UserCheck,
      tone: "text-emerald-600 bg-emerald-50",
    },
    {
      title: "Total Members",
      value: totalMembers,
      icon: Users,
      tone: "text-violet-600 bg-violet-50",
    },
    {
      title: "Assigned Projects",
      value: assignedProjects,
      icon: FolderKanban,
      tone: "text-amber-600 bg-amber-50",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-6">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                {stat.title}
              </p>

              <span
                className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${stat.tone}`}
              >
                <Icon className="h-4 w-4" />
              </span>
            </div>

            <h3 className="mt-3 text-3xl font-bold text-gray-900">
              {stat.value}
            </h3>
          </div>
        );
      })}
    </div>
  );
}
