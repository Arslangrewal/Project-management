"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CheckCircle2,
  Circle,
  Crown,
  FolderKanban,
  Info,
  Save,
  Users,
} from "lucide-react";
import Button from "@/app/components/ui/Button";
import SelectionPanel from "@/components/teams/SelectionPanel";
import { TeamColorDot } from "@/components/teams/teamUi";
import useTeamLookups from "@/hooks/useTeamLookups";
import { fetchProjects } from "@/redux/slices/projectSlice";
import { fetchTeams } from "@/redux/slices/teamSlice";

const colorPresets = [
  "#2563EB",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#14B8A6",
];

const fieldClass =
  "w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500";

function FormSection({ title, description, icon: Icon, children }) {
  return (
    <section className="space-y-5 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        {Icon && (
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
            <Icon className="h-4 w-4" />
          </span>
        )}

        <div>
          <h3 className="text-base font-semibold text-gray-900">{title}</h3>
          {description && (
            <p className="mt-1 text-sm leading-6 text-gray-500">
              {description}
            </p>
          )}
        </div>
      </div>
      {children}
    </section>
  );
}

function FieldLabel({ children, required = false }) {
  return (
    <label className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-gray-800">
      {children}
      {required && <span className="text-red-500">*</span>}
    </label>
  );
}

function SummaryItem({ icon: Icon, label, value, muted = false }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 px-3 py-2.5">
      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-gray-500 shadow-sm">
        <Icon className="h-4 w-4" />
      </span>

      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
          {label}
        </p>
        <p
          className={`truncate text-sm font-semibold ${
            muted ? "text-gray-400" : "text-gray-900"
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

function TeamSummary({ formData, leaderName }) {
  const hasName = Boolean(formData.name.trim());

  return (
    <aside className="space-y-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm xl:sticky xl:top-6">
      <div className="flex items-center gap-3">
        <TeamColorDot color={formData.color} size="lg" />

        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            Team preview
          </p>
          <h3 className="truncate text-lg font-bold text-gray-900">
            {hasName ? formData.name : "Unnamed team"}
          </h3>
        </div>
      </div>

      <p className="line-clamp-3 text-sm leading-6 text-gray-500">
        {formData.description ||
          "Add a short description so teammates know what this group owns."}
      </p>

      <div className="space-y-2.5">
        <SummaryItem
          icon={formData.status === "ACTIVE" ? CheckCircle2 : Circle}
          label="Status"
          value={formData.status === "ACTIVE" ? "Active" : "Inactive"}
        />
        <SummaryItem
          icon={Crown}
          label="Leader"
          value={leaderName || "Not selected"}
          muted={!leaderName}
        />
        <SummaryItem
          icon={Users}
          label="Members"
          value={`${formData.members.length} selected`}
        />
        <SummaryItem
          icon={FolderKanban}
          label="Projects"
          value={`${formData.projects.length} assigned`}
        />
      </div>

      <div className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-3 text-sm leading-6 text-blue-800">
        Keep the leader in the member list when they contribute directly to the
        team's work.
      </div>
    </aside>
  );
}

function StatusOption({ active, title, description, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-20 items-start gap-3 rounded-lg border p-3 text-left transition ${
        active
          ? "border-blue-300 bg-blue-50 ring-1 ring-blue-200"
          : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
      }`}
    >
      <span
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
          active
            ? "border-blue-600 bg-blue-600 text-white"
            : "border-gray-300 bg-white text-transparent"
        }`}
      >
        <CheckCircle2 className="h-3 w-3" />
      </span>

      <span>
        <span className="block text-sm font-semibold text-gray-900">
          {title}
        </span>
        <span className="mt-1 block text-xs leading-5 text-gray-500">
          {description}
        </span>
      </span>
    </button>
  );
}

export default function TeamForm({
  teamId = null,
  initialValues = {},
  loading = false,
  submitLabel = "Save Team",
  submitVariant = "outline",
  users: usersProp = [],
  projects: projectsProp = [],
  onSubmit,
  onCancel,
}) {
  const dispatch = useDispatch();
  const {
    users: fetchedUsers,
    projects: fetchedProjects,
    teams,
    loading: lookupsLoading,
    getProjectAssignments,
  } = useTeamLookups();

  const projectsFromStore = useSelector(
    (state) => state.projects.projects
  );

  const [users, setUsers] = useState(usersProp);
  const [optionsLoading, setOptionsLoading] = useState(true);

  const projects =
    projectsProp.length > 0 ? projectsProp : fetchedProjects.length
      ? fetchedProjects
      : projectsFromStore;

  useEffect(() => {
    if (usersProp.length > 0) {
      setUsers(usersProp);
    } else {
      setUsers(fetchedUsers);
    }
  }, [usersProp, fetchedUsers]);

  useEffect(() => {
    let cancelled = false;

    async function loadOptions() {
      setOptionsLoading(true);

      try {
        if (projectsProp.length === 0 && !projectsFromStore.length) {
          dispatch(fetchProjects());
        }

        if (!teams.length) {
          dispatch(fetchTeams());
        }
      } finally {
        if (!cancelled) {
          setOptionsLoading(false);
        }
      }
    }

    loadOptions();

    return () => {
      cancelled = true;
    };
  }, [dispatch, projectsProp.length, projectsFromStore.length, teams.length]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    leaderId: "",
    members: [],
    projects: [],
    status: "ACTIVE",
    color: "#3B82F6",
  });

  useEffect(() => {
    if (initialValues && Object.keys(initialValues).length > 0) {
      setFormData({
        name: initialValues.name || "",
        description: initialValues.description || "",
        leaderId: initialValues.leaderId || "",
        members: initialValues.members || [],
        projects: initialValues.projects || [],
        status: initialValues.status || "ACTIVE",
        color: initialValues.color || "#3B82F6",
      });
    }
  }, [initialValues]);

  const projectAssignments = useMemo(
    () => getProjectAssignments(teamId),
    [getProjectAssignments, teamId]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectionChange = (field, values) => {
    setFormData((prev) => ({
      ...prev,
      [field]: values,
    }));
  };

  const memberOptions = useMemo(
    () =>
      users.map((user) => ({
        id: user.id,
        title: user.name,
        subtitle: user.email || user.role,
        meta: user.role,
      })),
    [users]
  );

  const projectOptions = useMemo(
    () =>
      projects.map((project) => {
        const subtitle = project.client
          ? [project.client, project.id].join(" - ")
          : project.id;

        return {
          id: project.id,
          title: project.name,
          subtitle,
          meta: project.status,
        };
      }),
    [projects]
  );

  const leaderName = useMemo(
    () => users.find((user) => user.id === formData.leaderId)?.name,
    [formData.leaderId, users]
  );

  const getProjectHint = (item) => {
    const teamNames = projectAssignments[item.id];

    if (!teamNames?.length) return null;

    return `Already on ${teamNames.join(", ")}`;
  };

  const isLoading = optionsLoading || lookupsLoading;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) return;

    onSubmit?.(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <FormSection
            title="Basic Information"
            description="Set the team identity, visibility, and color marker."
            icon={Info}
          >
            <div className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <FieldLabel required>Team Name</FieldLabel>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter team name"
                  value={formData.name}
                  onChange={handleChange}
                  className={fieldClass}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <FieldLabel>Description</FieldLabel>

                <textarea
                  rows={4}
                  name="description"
                  placeholder="What does this team work on?"
                  value={formData.description}
                  onChange={handleChange}
                  className={`${fieldClass} resize-none leading-6`}
                />
              </div>

              <div>
                <FieldLabel>Status</FieldLabel>

                <div className="grid gap-3 sm:grid-cols-2">
                  <StatusOption
                    active={formData.status === "ACTIVE"}
                    title="Active"
                    description="Visible in team assignment flows."
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, status: "ACTIVE" }))
                    }
                  />
                  <StatusOption
                    active={formData.status === "INACTIVE"}
                    title="Inactive"
                    description="Retained for history and reporting."
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, status: "INACTIVE" }))
                    }
                  />
                </div>
              </div>

              <div>
                <FieldLabel>Team Color</FieldLabel>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                  <div className="flex items-center gap-3">
                    <TeamColorDot color={formData.color} size="lg" />
                    <input
                      type="color"
                      name="color"
                      value={formData.color}
                      onChange={handleChange}
                      className="h-10 flex-1 cursor-pointer rounded-lg border border-gray-200 bg-white p-1"
                    />
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {colorPresets.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, color }))
                        }
                        className={`h-7 w-7 rounded-full border-2 transition ${
                          formData.color.toLowerCase() === color.toLowerCase()
                            ? "border-gray-900 ring-2 ring-gray-200"
                            : "border-white hover:scale-105"
                        }`}
                        style={{ backgroundColor: color }}
                        aria-label={`Use color ${color}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FormSection>

          <FormSection
            title="People"
            description="Choose who leads the team and who belongs to it."
            icon={Users}
          >
            <div>
              <FieldLabel>Team Leader</FieldLabel>

              <select
                name="leaderId"
                value={formData.leaderId}
                onChange={handleChange}
                disabled={isLoading}
                className={fieldClass}
              >
                <option value="">
                  {isLoading ? "Loading users..." : "Select team leader"}
                </option>

                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} {user.role ? `(${user.role})` : ""}
                  </option>
                ))}
              </select>
            </div>

            <SelectionPanel
              label="Members"
              items={memberOptions}
              selectedIds={formData.members}
              onChange={(values) => handleSelectionChange("members", values)}
              loading={isLoading}
              emptyMessage="No users available"
              selectedLabel="Member"
            />
          </FormSection>

          <FormSection
            title="Project Assignments"
            description="See which projects belong to this team and which are already assigned elsewhere."
            icon={FolderKanban}
          >
            <SelectionPanel
              label="Assigned Projects"
              items={projectOptions}
              selectedIds={formData.projects}
              onChange={(values) => handleSelectionChange("projects", values)}
              loading={isLoading}
              emptyMessage="No projects available"
              selectedLabel="Assigned"
              getItemHint={getProjectHint}
              groupSelected
            />
          </FormSection>
        </div>

        <TeamSummary formData={formData} leaderName={leaderName} />
      </div>

      <div className="sticky bottom-0 z-10 -mx-6 border-t border-gray-200 bg-white/90 px-6 py-4 backdrop-blur">
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={loading}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant={submitVariant}
            loading={loading}
            disabled={loading || !formData.name.trim()}
            leftIcon={<Save className="h-4 w-4" />}
            className="w-full sm:w-auto"
          >
            {submitLabel}
          </Button>
        </div>
      </div>
    </form>
  );
}
