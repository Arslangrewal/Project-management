"use client";

import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { ArrowLeft, Eye } from "lucide-react";
import PageHeader from "@/components/shared/pageHeader";
import TeamForm from "@/components/teams/TeamForm";
import { editTeam } from "@/redux/slices/teamSlice";
import { handleAsyncAction } from "@/lib/handleAsyncAction";
import Button from "@/app/components/ui/Button";

export default function EditTeamPage() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const router = useRouter();

  const team = useSelector((state) =>
    state.teams.teams.find((item) => item.id === id)
  );

  const handleSubmit = async (values) => {
    await handleAsyncAction(
      dispatch,
      editTeam,
      {
        id,
        teamData: values,
      },
      {
        successMessage: "Team updated successfully.",
        onSuccess: () => router.back(),
      }
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={team ? `Edit ${team.name}` : "Edit Team"}
        description="Update team details and clearly manage project assignments."
        action={
          <>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<ArrowLeft className="h-4 w-4" />}
              onClick={() => router.push("/dashboard/teams")}
            >
              Teams
            </Button>

            {team && (
              <Link href={`/dashboard/teams/view/${team.id}`}>
                <Button
                  variant="secondary"
                  size="sm"
                  leftIcon={<Eye className="h-4 w-4" />}
                >
                  View
                </Button>
              </Link>
            )}
          </>
        }
      />

      <TeamForm
        teamId={id}
        initialValues={team}
        submitLabel="Update Team"
        submitVariant="success"
        onSubmit={handleSubmit}
        onCancel={() => router.back()}
      />
    </div>
  );
}
