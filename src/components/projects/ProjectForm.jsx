"use client";

import { useEffect, useState } from "react";

import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import Dropdown from "@/app/components/ui/Dropdown";

const STATUS_OPTIONS = [
  { label: "Planning", value: "Planning" },
  { label: "Active", value: "Active" },
  { label: "On Hold", value: "On Hold" },
  { label: "Completed", value: "Completed" },
  { label: "Cancelled", value: "Cancelled" },
];

const PRIORITY_OPTIONS = [
  { label: "Low", value: "Low" },
  { label: "Medium", value: "Medium" },
  { label: "High", value: "High" },
  { label: "Critical", value: "Critical" },
];

const initialForm = {
  name: "",
  description: "",
  client: "",
  manager: "",
  budget: "",
  progress: 0,
  status: "Planning",
  priority: "Medium",
  members: 1,
  startDate: "",
  dueDate: "",
};

export default function ProjectForm({
  initialValues = {},
  loading = false,
  submitLabel = "Save Project",
  submitVariant = "outline",
  onSubmit,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    ...initialForm,
    ...initialValues,
  });

  useEffect(() => {
    setFormData({
      ...initialForm,
      ...initialValues,
    });
  }, [initialValues]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      return alert("Project name is required.");
    }

    if (!formData.client.trim()) {
      return alert("Client is required.");
    }

    if (!formData.manager.trim()) {
      return alert("Project manager is required.");
    }

    onSubmit?.({
      ...formData,
      budget: Number(formData.budget),
      progress: Number(formData.progress),
      members: Number(formData.members),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Project Name */}

      <Input
        label="Project Name"
        placeholder="Website Redesign"
        value={formData.name}
        onChange={(e) =>
          handleChange("name", e.target.value)
        }
      />

      {/* Description */}

      <Input
        label="Description"
        placeholder="Project description..."
        value={formData.description}
        onChange={(e) =>
          handleChange(
            "description",
            e.target.value
          )
        }
      />

      {/* Client */}

      <Input
        label="Client"
        placeholder="Acme Corporation"
        value={formData.client}
        onChange={(e) =>
          handleChange("client", e.target.value)
        }
      />

      {/* Manager */}

      <Input
        label="Project Manager"
        placeholder="John Doe"
        value={formData.manager}
        onChange={(e) =>
          handleChange(
            "manager",
            e.target.value
          )
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="number"
          label="Budget"
          placeholder="5000"
          value={formData.budget}
          onChange={(e) =>
            handleChange(
              "budget",
              e.target.value
            )
          }
        />

        <Input
          type="number"
          label="Progress (%)"
          placeholder="0"
          value={formData.progress}
          onChange={(e) =>
            handleChange(
              "progress",
              e.target.value
            )
          }
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Dropdown
          label="Status"
          options={STATUS_OPTIONS}
          value={formData.status}
          onChange={(value) =>
            handleChange("status", value)
          }
        />

        <Dropdown
          label="Priority"
          options={PRIORITY_OPTIONS}
          value={formData.priority}
          onChange={(value) =>
            handleChange(
              "priority",
              value
            )
          }
        />
      </div>

      <Input
        type="number"
        label="Team Members"
        value={formData.members}
        onChange={(e) =>
          handleChange(
            "members",
            e.target.value
          )
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="date"
          label="Start Date"
          value={formData.startDate}
          onChange={(e) =>
            handleChange(
              "startDate",
              e.target.value
            )
          }
        />

        <Input
          type="date"
          label="Due Date"
          value={formData.dueDate}
          onChange={(e) =>
            handleChange(
              "dueDate",
              e.target.value
            )
          }
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          variant={submitVariant}
          loading={loading}
        >
          {loading ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}