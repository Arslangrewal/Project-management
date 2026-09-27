"use client";

import Link from "next/link";
import { FolderKanban, Users } from "lucide-react";
import Button from "@/app/components/ui/Button";
import {
  MemberBadge,
  ProjectChipList,
  TeamColorDot,
} from "@/components/teams/teamUi";
import useTeamLookups from "@/hooks/useTeamLookups";
import { useDispatch } from "react-redux";
import { removeTeam } from "@/redux/slices/teamSlice";

export default function TeamsTable({ teams = [] }) {
  const dispatch = useDispatch();
  const {
    resolveProjects,
    resolveUserName,
    loading,
  } = useTeamLookups();

  if (!teams.length) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-12 text-center">
        <h3 className="text-lg font-semibold text-gray-800">
          No Teams Found
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Create your first team to get started.
        </p>
      </div>
    );
  }

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this team?")) {
      return;
    }

    dispatch(removeTeam(id));
  };

  return (
    <div className="space-y-4">
      {teams.map((team) => {
        const assignedProjects = resolveProjects(team.projects);
        const memberCount = team.members?.length || 0;
        const leaderName = resolveUserName(team.leaderId);

        return (
          <article
            key={team.id}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-gray-300 hover:shadow-md"
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0 flex-1 space-y-4">
                <div className="flex items-start gap-3">
                  <TeamColorDot color={team.color} size="lg" />

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {team.name}
                      </h3>

                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${team.status === "ACTIVE"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-gray-100 text-gray-600"
                          }`}
                      >
                        {team.status}
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-gray-500">
                      {team.description || "No description provided."}
                    </p>

                    {team.leaderId && (
                      <p className="mt-2 text-xs text-gray-500">
                        Leader:{" "}
                        <span className="font-medium text-gray-700">
                          {leaderName}
                        </span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl border border-gray-100 bg-gray-50/80 p-4">
                    <div className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Users className="h-4 w-4 text-violet-500" />
                      Members
                    </div>

                    <MemberBadge count={memberCount} />
                  </div>

                  <div className="rounded-xl border border-gray-100 bg-gray-800 p-4">
                    <div className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                      <FolderKanban className="h-4 w-4 text-blue-500" />
                      Assigned Projects
                    </div>

                    {loading ? (
                      <span className="text-sm text-gray-400">
                        Loading projects...
                      </span>
                    ) : (
                      <ProjectChipList
                        projects={assignedProjects}
                        assigned
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 flex-wrap items-center gap-2 lg:flex-col lg:items-stretch mt-2">
                <Link href={`/dashboard/teams/view/${team.id}`}>
                  <Button variant="secondary" size="sm" className="w-full">
                    View
                  </Button>
                </Link>

                <Link href={`/dashboard/teams/edit/${team.id}`}>
                  <Button variant="outline" size="sm" className="w-full">
                    Edit
                  </Button>
                </Link>

                <Button
                  variant="danger"
                  size="sm"
                  className="w-full"
                  onClick={() => handleDelete(team.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
