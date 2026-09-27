"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import ProjectForm from "@/components/projects/ProjectForm";
import { createProject } from "@/redux/slices/projectSlice";

export default function CreateProjectPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      await dispatch(createProject(values)).unwrap();
      toast.success("Project created successfully.");
      router.push("/dashboard/projects");
    } catch (error) {
      toast.error(error || "Failed to create project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Create Project</h2>
        <p className="text-sm text-gray-500">
          Add a new project and set its delivery details.
        </p>
      </div>

      <div className="rounded-xl border bg-white p-6">
        <ProjectForm
          loading={loading}
          onSubmit={handleSubmit}
          onCancel={() => router.push("/dashboard/projects")}
        />
      </div>
    </div>
    
  );
}
