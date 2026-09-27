"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import ProjectForm from "@/components/projects/ProjectForm";
import { updateProject } from "@/redux/slices/projectSlice";
import projectService from "@/services/projectService";

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch();


  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const projectId = params?.id;

    if (!projectId) return;

    const existingProject = projectService.getProjectById(projectId);

    if (existingProject) {
      setProject(existingProject);
    } else {
      toast.error("Project not found.");
      router.replace("/dashboard/projects");
    }
  }, [params?.id, router]);

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      await dispatch(
        updateProject({
          id: params.id,
          data: values,
        })
      ).unwrap();

      toast.success("Project updated successfully.");
      router.push("/dashboard/projects");
    } catch (error) {
      toast.error(error || "Failed to update project.");
    } finally {
      setLoading(false);
    }
  };

  if (!project) {
    return (
      <div className="rounded-xl border bg-white p-6 text-sm text-gray-500">
        Loading project details...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Edit Project</h2>
        <p className="text-sm text-gray-500">
          Update the project details and save the changes.
        </p>
      </div>

      <div className="rounded-xl border bg-white p-6">
        <ProjectForm
          initialValues={project}
          loading={loading}
          submitVariant="outline"
          submitLabel="Update Project"
          onSubmit={handleSubmit}
          onCancel={() => router.push("/dashboard/projects")}
        />
      </div>
    </div>
  );
}
