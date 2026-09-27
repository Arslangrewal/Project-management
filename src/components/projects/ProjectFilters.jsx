"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";

import Button from "@/app/components/ui/Button";
import Dropdown from "@/app/components/ui/Dropdown";
import Input from "@/app/components/ui/Input";

import useProjects from "@/hooks/useProjects";

export default function ProjectFilters() {
    const router = useRouter();
    const {
        allProjects,
        search,
        filters,
        searchProjects,
        filterProjects,
        resetFilters,
    } = useProjects();

    /* -------------------------------------------------------------------------- */
    /*                            Dropdown Options                                */
    /* -------------------------------------------------------------------------- */
    const statusOptions = useMemo(() => {
        const statuses = [
            ...new Set(
                allProjects.map((project) => project.status)
            ),
        ];

        return [
            {
                label: "All Statuses",
                value: "All",
            },
            ...statuses.map((status) => ({
                label: status,
                value: status,
            })),
        ];
    }, [allProjects]);

    const priorityOptions = useMemo(() => {
        const priorities = [
            ...new Set(
                allProjects.map((project) => project.priority)
            ),
        ];

        return [
            {
                label: "All Priorities",
                value: "All",
            },
            ...priorities.map((priority) => ({
                label: priority,
                value: priority,
            })),
        ];
    }, [allProjects]);

    const managerOptions = useMemo(() => {
        const managers = [
            ...new Set(
                allProjects.map((project) => project.manager)
            ),
        ];

        return [
            {
                label: "All Managers",
                value: "All",
            },
            ...managers.map((manager) => ({
                label: manager,
                value: manager,
            })),
        ];
    }, [allProjects]);

    /* -------------------------------------------------------------------------- */

    return (
        <div className="bg-white rounded-xl p-5 shadow-lg">
            <div className="flex flex-wrap gap-4 items-end">
                <Input
                    label="Search"
                    placeholder="Search projects"
                    value={search}
                    onChange={(event) => searchProjects(event.target.value)}
                />

                <Dropdown
                    label="Status"
                    placeholder="All Statuses"
                    value={filters.status}
                    options={statusOptions}
                    onChange={(value) => filterProjects({ status: value })}
                    searchable
                />

                <Dropdown
                    label="Priority"
                    placeholder="All Priorities"
                    value={filters.priority}
                    options={priorityOptions}
                    onChange={(value) => filterProjects({ priority: value })}
                    searchable
                />

                <Dropdown
                    label="Manager"
                    placeholder="All Managers"
                    value={filters.manager}
                    options={managerOptions}
                    onChange={(value) => filterProjects({ manager: value })}
                    searchable
                />

                <Button variant="outline" onClick={() => resetFilters()}>
                    Reset Filters
                </Button>

                <Button
                    variant="secondary"
                    onClick={() => router.push("/dashboard/projects/create")}
                >
                    + New Project
                </Button>

            </div>
        </div>
    );
}