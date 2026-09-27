"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "@/redux/slices/projectSlice";
import { fetchTeams } from "@/redux/slices/teamSlice";

export default function useTeamLookups() {
  const dispatch = useDispatch();

  const projects = useSelector((state) => state.projects.projects);
  const teams = useSelector((state) => state.teams.teams);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);

      try {
        const response = await fetch("/api/users");

        if (response.ok && !cancelled) {
          setUsers(await response.json());
        }

        if (!projects.length) {
          dispatch(fetchProjects());
        }

        if (!teams.length) {
          dispatch(fetchTeams());
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [dispatch, projects.length, teams.length]);

  const projectMap = useMemo(
    () => new Map(projects.map((project) => [project.id, project])),
    [projects]
  );

  const userMap = useMemo(
    () => new Map(users.map((user) => [user.id, user])),
    [users]
  );

  const resolveProjectName = (projectId) =>
    projectMap.get(projectId)?.name || projectId;

  const resolveUserName = (userId) =>
    userMap.get(userId)?.name || userId;

  const resolveProjects = (projectIds = []) =>
    projectIds.map((projectId) => {
      const project = projectMap.get(projectId);

      return {
        id: projectId,
        name: project?.name || projectId,
        status: project?.status,
        client: project?.client,
      };
    });

  const getProjectAssignments = (excludeTeamId = null) => {
    const assignments = {};

    teams.forEach((team) => {
      if (team.id === excludeTeamId) return;

      (team.projects || []).forEach((projectId) => {
        if (!assignments[projectId]) {
          assignments[projectId] = [];
        }

        assignments[projectId].push(team.name);
      });
    });

    return assignments;
  };

  return {
    users,
    projects,
    teams,
    projectMap,
    userMap,
    loading,
    resolveProjectName,
    resolveUserName,
    resolveProjects,
    getProjectAssignments,
  };
}
