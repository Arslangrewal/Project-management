"use client";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import PageHeader from "@/components/shared/pageHeader";
import TeamForm from "@/components/teams/TeamForm";
import { addTeam } from "@/redux/slices/teamSlice";
import { handleAsyncAction } from "@/lib/handleAsyncAction";

export default function CreateTeamPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (values) => {
    const result = await handleAsyncAction(
      dispatch,
      addTeam,
      values,
      {
        successMessage: "Team created successfully.",
        onSuccess: () => router.push("/dashboard/teams"),
      }
    );

    if (!result.success) return;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Create Team"
        description="Build a new team, assign members, and link projects in one place."
      />

      <TeamForm
        onSubmit={handleSubmit}
        onCancel={() => router.push("/dashboard/teams")}
      />
    </div>
  );
}