"use client";

import { useMemo, useState } from "react";
import { CheckSquare, Clock3, ListFilter } from "lucide-react";

import Button from "@/app/components/ui/Button";
import Card from "@/app/components/ui/Card";
import Input from "@/app/components/ui/Input";
import Dropdown from "@/app/components/ui/Dropdown";
import PageHeader from "@/components/shared/pageHeader";
import TaskForm from "@/features/tasks/components/TaskForm";
import TaskTable from "@/features/tasks/components/TaskTable";

const defaultTasks = [
  {
    id: 1,
    title: "Prepare sprint summary",
    description: "Review sprint metrics and share rollout notes.",
    project: "Website Redesign",
    assignee: "Aisha",
    status: "In Progress",
    priority: "High",
    dueDate: "2026-09-02",
    estimate: 6,
  },
  {
    id: 2,
    title: "QA regression pass",
    description: "Run smoke tests for the customer dashboard.",
    project: "Mobile App",
    assignee: "Daniel",
    status: "Review",
    priority: "Medium",
    dueDate: "2026-09-04",
    estimate: 5,
  },
  {
    id: 3,
    title: "Finalize onboarding checklist",
    description: "Finalize the checklist for new team members.",
    project: "CRM Upgrade",
    assignee: "Priya",
    status: "To Do",
    priority: "Low",
    dueDate: "2026-09-06",
    estimate: 3,
  },
  {
    id: 4,
    title: "Resolve payment integration issue",
    description: "Investigate the gateway timeout affecting test accounts.",
    project: "Marketing Launch",
    assignee: "Marcus",
    status: "Blocked",
    priority: "Critical",
    dueDate: "2026-08-31",
    estimate: 8,
  },
];

const STATUS_OPTIONS = [
  { label: "All Statuses", value: "All" },
  { label: "To Do", value: "To Do" },
  { label: "In Progress", value: "In Progress" },
  { label: "Review", value: "Review" },
  { label: "Completed", value: "Completed" },
  { label: "Blocked", value: "Blocked" },
];

const PRIORITY_OPTIONS = [
  { label: "All Priorities", value: "All" },
  { label: "Low", value: "Low" },
  { label: "Medium", value: "Medium" },
  { label: "High", value: "High" },
  { label: "Critical", value: "Critical" },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState(defaultTasks);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.status === "Completed").length;
    const inProgress = tasks.filter((task) => task.status === "In Progress").length;
    const overdue = tasks.filter((task) => task.status !== "Completed" && task.dueDate < "2026-08-29").length;

    return [
      { label: "Total Tasks", value: total, icon: CheckSquare, accent: "bg-indigo-100 text-indigo-600" },
      { label: "In Progress", value: inProgress, icon: Clock3, accent: "bg-amber-100 text-amber-600" },
      { label: "Completed", value: completed, icon: CheckSquare, accent: "bg-emerald-100 text-emerald-600" },
      { label: "Overdue", value: overdue, icon: ListFilter, accent: "bg-rose-100 text-rose-600" },
    ];
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        !search ||
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.assignee.toLowerCase().includes(search.toLowerCase()) ||
        task.project.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter === "All" || task.status === statusFilter;
      const matchesPriority = priorityFilter === "All" || task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, search, statusFilter, priorityFilter]);

  const handleCreateTask = (newTask) => {
    setTasks((current) => [
      {
        id: Date.now(),
        ...newTask,
      },
      ...current,
    ]);
    setEditingTask(null);
    setIsFormOpen(false);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === editingTask.id ? { ...task, ...updatedTask } : task
      )
    );
    setEditingTask(null);
    setIsFormOpen(false);
  };

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      handleUpdateTask(taskData);
      return;
    }

    handleCreateTask(taskData);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleDeleteTask = (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    setTasks((current) => current.filter((task) => task.id !== taskId));
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Tasks"
        description="Track priorities, execution flow, and delivery progress across your workstreams."
        action={
          <Button
            variant="primary"
            onClick={() => {
              setEditingTask(null);
              setIsFormOpen(true);
            }}
          >
            + New Task
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 mb-4">
        {stats.map(({ label, value, icon: Icon, accent }) => (
          <Card key={label} className="p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{label}</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
              </div>
              <div className={`rounded-xl p-3 ${accent}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-5 shadow-sm" title="Task Overview" subtitle="This week’s team workload and delivery status">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
          <div className="flex-1">
            <Input
              label="Search"
              placeholder="Search tasks, assignee, or project"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="w-full lg:max-w-[220px]">
            <Dropdown
              label="Status"
              value={statusFilter}
              options={STATUS_OPTIONS}
              onChange={setStatusFilter}
            />
          </div>

          <div className="w-full lg:max-w-[220px]">
            <Dropdown
              label="Priority"
              value={priorityFilter}
              options={PRIORITY_OPTIONS}
              onChange={setPriorityFilter}
            />
          </div>

          <Button
            variant="secondary"
            onClick={() => {
              setSearch("");
              setStatusFilter("All");
              setPriorityFilter("All");
            }}
          >
            Reset
          </Button>
        </div>
      </Card>

      {isFormOpen && (
        <Card
          title={editingTask ? "Edit Task" : "Create Task"}
          subtitle={editingTask ? "Update task details" : "Add a new task for your team"}
          className="p-5 shadow-sm"
        >
          <TaskForm
            initialValues={editingTask || {}}
            onSubmit={handleSaveTask}
            onCancel={() => {
              setEditingTask(null);
              setIsFormOpen(false);
            }}
            submitLabel={editingTask ? "Update Task" : "Create Task"}
          />
        </Card>
      )}

      <TaskTable tasks={filteredTasks} onEdit={handleEditTask} onDelete={handleDeleteTask} />
    </div>
  );
}
