"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import Link from "next/link";
import { FolderKanban, Users, Crown } from "lucide-react";

import Button from "@/app/components/ui/Button";
import {
  ProjectChip,
  TeamColorDot,
} from "@/components/teams/teamUi";
import useTeamLookups from "@/hooks/useTeamLookups";

function SectionCard({ title, icon: Icon, children }) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
          <Icon className="h-4 w-4" />
        </span>
        <h2 className="text-base font-semibold text-gray-900">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default function ViewTeamPage() {
  const { id } = useParams();

  const team = useSelector((state) =>
    state.teams.teams.find((item) => item.id === id)
  );

  const {
    resolveProjects,
    userMap,
    loading,
  } = useTeamLookups();

  const leader = useMemo(
    () => userMap.get(team?.leaderId),
    [userMap, team?.leaderId]
  );

  const members = useMemo(
    () =>
      (team?.members || [])
        .map((memberId) => userMap.get(memberId))
        .filter(Boolean),
    [team?.members, userMap]
  );

  const assignedProjects = useMemo(
    () => resolveProjects(team?.projects),
    [resolveProjects, team?.projects]
  );

  if (!team) {
    return (
      <div className="rounded-2xl border bg-white p-10 text-center">
        <h3 className="text-xl font-semibold text-gray-800">
          Team Not Found
        </h3>

        <p className="mt-2 text-gray-500">
          The requested team does not exist.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div
          className="h-2"
          style={{ backgroundColor: team.color || "#3B82F6" }}
        />

        <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <TeamColorDot color={team.color} size="lg" />

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-900">
                  {team.name}
                </h1>

                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    team.status === "ACTIVE"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {team.status}
                </span>
              </div>

              <p className="mt-1 text-gray-500">
                {team.description || "No description provided."}
              </p>
            </div>
          </div>

          <Link href={`/dashboard/teams/edit/${team.id}`}>
            <Button variant="success" size="sm">
              Edit Team
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Team Leader" icon={Crown}>
          {leader ? (
            <div className="rounded-xl border border-amber-100 bg-amber-50/60 p-4">
              <p className="font-semibold text-gray-900">{leader.name}</p>
              <p className="text-sm text-gray-500">{leader.email}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-amber-700">
                {leader.role}
              </p>
            </div>
          ) : (
            <p className="text-sm text-gray-500">No leader assigned.</p>
          )}
        </SectionCard>

        <SectionCard title="Members" icon={Users}>
          {members.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {members.map((member) => (
                <span
                  key={member.id}
                  className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-sm font-medium text-violet-800"
                >
                  {member.name}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No members assigned.</p>
          )}
        </SectionCard>
      </div>

      <SectionCard title="Assigned Projects" icon={FolderKanban}>
        {loading ? (
          <p className="text-sm text-gray-500">Loading projects...</p>
        ) : assignedProjects.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {assignedProjects.map((project) => (
              <div
                key={project.id}
                className="rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {project.name}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {project.client || project.id}
                    </p>
                  </div>

                  <ProjectChip
                    name="Assigned"
                    status={project.status}
                    assigned
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            No projects assigned to this team.
          </p>
        )}
      </SectionCard>
    </div>
  );
}
