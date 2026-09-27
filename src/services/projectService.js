// src/services/projectService.js

import projectsData from "@/data/projects";

const STORAGE_KEY = "saas_projects";

/**
 * Initialize localStorage with mock data
 * Only runs the first time the application loads.
 */
const initializeProjects = () => {
  if (typeof window === "undefined") return;

  const projects = localStorage.getItem(STORAGE_KEY);

  if (!projects) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(projectsData)
    );
  }
};

/**
 * Read all projects from localStorage
 */
const getProjects = () => {
  initializeProjects();

  const projects = localStorage.getItem(STORAGE_KEY);

  return projects ? JSON.parse(projects) : [];
};

/**
 * Save projects back to localStorage
 */
const saveProjects = (projects) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(projects)
  );
};

/**
 * Get project by ID
 */
const getProjectById = (id) => {
  const projects = getProjects();

  return (
    projects.find(
      (project) => project.id === id
    ) || null
  );
};

/**
 * Create a new project
 */
const createProject = (projectData) => {
  const projects = getProjects();

  const newProject = {
    id: crypto.randomUUID(),

    ...projectData,

    progress: projectData.progress ?? 0,

    createdAt: new Date()
      .toISOString()
      .split("T")[0],
  };

  projects.unshift(newProject);

  saveProjects(projects);

  return newProject;
};

/**
 * Update an existing project
 */
const updateProject = (
  id,
  updatedData
) => {
  const projects = getProjects();

  const updatedProjects = projects.map(
    (project) =>
      project.id === id
        ? {
            ...project,
            ...updatedData,
          }
        : project
  );

  saveProjects(updatedProjects);

  return updatedProjects.find(
    (project) => project.id === id
  );
};

/**
 * Delete project permanently
 */
const deleteProject = (id) => {
  const projects = getProjects();

  const updatedProjects =
    projects.filter(
      (project) => project.id !== id
    );

  saveProjects(updatedProjects);

  return true;
};

/**
 * Archive project
 */
const archiveProject = (id) => {
  return updateProject(id, {
    status: "Archived",
  });
};

/**
 * Reset localStorage to original mock data
 * Useful during development.
 */
const resetProjects = () => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(projectsData)
  );

  return getProjects();
};

const projectService = {
  initializeProjects,
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  archiveProject,
  resetProjects,
};

export default projectService;