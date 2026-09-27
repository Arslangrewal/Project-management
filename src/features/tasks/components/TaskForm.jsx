"use client";

import { useEffect, useMemo, useState } from "react";

import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import Dropdown from "@/app/components/ui/Dropdown";

const STATUS_OPTIONS = [
  { label: "To Do", value: "To Do" },
  { label: "In Progress", value: "In Progress" },
  { label: "Review", value: "Review" },
  { label: "Completed", value: "Completed" },
  { label: "Blocked", value: "Blocked" },
];

const PRIORITY_OPTIONS = [
  { label: "Low", value: "Low" },
  { label: "Medium", value: "Medium" },
  { label: "High", value: "High" },
  { label: "Critical", value: "Critical" },
];

const defaultForm = {
  title: "",
  description: "",
  assignee: "",
  project: "",
  dueDate: "",
  priority: "Medium",
  status: "To Do",
  estimate: "",
};

export default function TaskForm({
  initialValues = {},
  loading = false,
  onSubmit,
  onCancel,
  submitLabel = "Save Task",
}) {
  const [formData, setFormData] = useState({ ...defaultForm, ...initialValues });

  useEffect(() => {
    setFormData({ ...defaultForm, ...initialValues });
  }, [initialValues]);

  const assigneeOptions = useMemo(
    () => [
      { label: "Unassigned", value: "" },
      { label: "Aisha", value: "Aisha" },
      { label: "Daniel", value: "Daniel" },
      { label: "Priya", value: "Priya" },
      { label: "Marcus", value: "Marcus" },
    ],
    []
  );

  const projectOptions = useMemo(
    () => [
      { label: "Website Redesign", value: "Website Redesign" },
      { label: "Mobile App", value: "Mobile App" },
      { label: "CRM Upgrade", value: "CRM Upgrade" },
      { label: "Marketing Launch", value: "Marketing Launch" },
    ],
    []
  );

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      window.alert("Task title is required.");
      return;
    }

    onSubmit?.({
      ...formData,
      estimate: Number(formData.estimate || 0),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <Input
            label="Task Title"
            placeholder="Prepare sprint summary"
            value={formData.title}
            onChange={(event) => handleChange("title", event.target.value)}
          />
        </div>

        <div className="md:col-span-2">
          <Input
            label="Description"
            placeholder="Describe the task and expected outcome"
            value={formData.description}
            onChange={(event) => handleChange("description", event.target.value)}
          />
        </div>

        <Dropdown
          label="Project"
          placeholder="Select project"
          value={formData.project}
          options={projectOptions}
          onChange={(value) => handleChange("project", value)}
        />

        <Dropdown
          label="Assignee"
          placeholder="Select assignee"
          value={formData.assignee}
          options={assigneeOptions}
          onChange={(value) => handleChange("assignee", value)}
        />

        <Dropdown
          label="Status"
          placeholder="Status"
          value={formData.status}
          options={STATUS_OPTIONS}
          onChange={(value) => handleChange("status", value)}
        />

        <Dropdown
          label="Priority"
          placeholder="Priority"
          value={formData.priority}
          options={PRIORITY_OPTIONS}
          onChange={(value) => handleChange("priority", value)}
        />

        <Input
          type="date"
          label="Due Date"
          value={formData.dueDate}
          onChange={(event) => handleChange("dueDate", event.target.value)}
        />

        <Input
          type="number"
          label="Estimate (hrs)"
          placeholder="8"
          value={formData.estimate}
          onChange={(event) => handleChange("estimate", event.target.value)}
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" loading={loading}>
          {loading ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}

