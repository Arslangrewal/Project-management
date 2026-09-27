"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import PageHeader from "@/components/shared/pageHeader";
import Button from "@/app/components/ui/Button";
import Loader from "@/app/components/ui/Loader";

import TeamStats from "@/components/teams/TeamStats";
import TeamsTable from "@/components/teams/TeamsTable";

import { fetchTeams } from "@/redux/slices/teamSlice";

export default function TeamsPage() {
  const dispatch = useDispatch();

  const { teams, loading, error } = useSelector(
    (state) => state.teams
  );

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
        {error}
      </div>
    );
  }

    

  return (
    <div className="space-y-8">
      <PageHeader
        title="Teams"
        description="Create, organize and manage teams across your organization."
        action={
          <Link href="/dashboard/teams/create">
            <Button variant="success" size="sm">
              + Create Team
            </Button>
          </Link>
        }
      />

      <TeamStats teams={teams} />

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-6 py-5">
          <h2 className="text-lg font-semibold text-gray-900 mt-2">
            Teams Directory
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Review teams, members, and assigned projects at a glance.
          </p>
        </div>

        <div className="p-6">
          <TeamsTable teams={teams} />
        </div>
      </div>
    </div>
  );
}