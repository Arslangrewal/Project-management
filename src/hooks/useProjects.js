"use client";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
  archiveProject,
  setSelectedProject,
  clearSelectedProject,
  setSearch,
  setFilters,
  clearFilters,
  setCurrentPage,
  setPageSize,
} from "@/redux/slices/projectSlice";

export default function useProjects() {
  const dispatch = useDispatch();

  const {
    projects,
    selectedProject,
    loading,
    error,
    search,
    filters,
    pagination,
  } = useSelector((state) => state.projects);

  useEffect(() => {
    if (!projects.length) {
      dispatch(fetchProjects());
    }
  }, [dispatch, projects.length]);

  /* -------------------------------------------------------------------------- */
  /*                              Derived Projects                              */
  /* -------------------------------------------------------------------------- */

  const filteredProjects = useMemo(() => {
    let data = [...projects];

    // Search
    if (search.trim()) {
      const keyword = search.toLowerCase();

      data = data.filter((project) => {
        return (
          project.name.toLowerCase().includes(keyword) ||
          project.client.toLowerCase().includes(keyword) ||
          project.manager.toLowerCase().includes(keyword)
        );
      });
    }

    // Status Filter
    if (filters.status !== "All") {
      data = data.filter(
        (project) => project.status === filters.status
      );
    }

    // Priority Filter
    if (filters.priority !== "All") {
      data = data.filter(
        (project) => project.priority === filters.priority
      );
    }

    // Manager Filter
    if (filters.manager !== "All") {
      data = data.filter(
        (project) => project.manager === filters.manager
      );
    }

    return data;
  }, [projects, search, filters]);

  /* -------------------------------------------------------------------------- */
  /*                                Statistics                                  */
  /* -------------------------------------------------------------------------- */

  const statistics = useMemo(() => {
    return {
      total: projects.length,

      active: projects.filter(
        (p) => p.status === "Active"
      ).length,

      planning: projects.filter(
        (p) => p.status === "Planning"
      ).length,

      completed: projects.filter(
        (p) => p.status === "Completed"
      ).length,

      archived: projects.filter(
        (p) => p.status === "Archived"
      ).length,

      cancelled: projects.filter(
        (p) => p.status === "Cancelled"
      ).length,

      onHold: projects.filter(
        (p) => p.status === "On Hold"
      ).length,
    };
  }, [projects]);

  /* -------------------------------------------------------------------------- */
  /*                                Pagination                                  */
  /* -------------------------------------------------------------------------- */

  const totalItems = filteredProjects.length;

  const totalPages = Math.ceil(
    totalItems / pagination.pageSize
  );

  const paginatedProjects = useMemo(() => {
    const start =
      (pagination.currentPage - 1) *
      pagination.pageSize;

    const end = start + pagination.pageSize;

    return filteredProjects.slice(start, end);
  }, [filteredProjects, pagination]);

  /* -------------------------------------------------------------------------- */
  /*                                   CRUD                                     */
  /* -------------------------------------------------------------------------- */

  const fetchAllProjects = () =>
    dispatch(fetchProjects());

  const createNewProject = (data) =>
    dispatch(createProject(data));

  const updateExistingProject = (
    id,
    data
  ) =>
    dispatch(
      updateProject({
        id,
        data,
      })
    );

  const removeProject = (id) =>
    dispatch(deleteProject(id));

  const archiveExistingProject = (
    id
  ) =>
    dispatch(archiveProject(id));

  /* -------------------------------------------------------------------------- */
  /*                                Selection                                   */
  /* -------------------------------------------------------------------------- */

  const selectProject = (
    project
  ) =>
    dispatch(
      setSelectedProject(project)
    );

  const unselectProject = () =>
    dispatch(clearSelectedProject());

  /* -------------------------------------------------------------------------- */
  /*                              Search / Filters                              */
  /* -------------------------------------------------------------------------- */

  const searchProjects = (
    keyword
  ) => dispatch(setSearch(keyword));

  const filterProjects = (
    filter
  ) => dispatch(setFilters(filter));

  const resetFilters = () =>
    dispatch(clearFilters());

  /* -------------------------------------------------------------------------- */
  /*                                Pagination                                  */
  /* -------------------------------------------------------------------------- */

  const changePage = (page) =>
    dispatch(setCurrentPage(page));

  const changePageSize = (
    size
  ) =>
    dispatch(setPageSize(size));

  return {
    // Data
    projects: paginatedProjects,
    allProjects: filteredProjects,

    // Statistics
    statistics,
    totalItems,
    totalPages,

    // Redux State
    selectedProject,
    loading,
    error,
    search,
    filters,
    pagination,

    // CRUD
    fetchAllProjects,
    createNewProject,
    updateExistingProject,
    removeProject,
    archiveExistingProject,

    // Selection
    selectProject,
    unselectProject,

    // Search
    searchProjects,
    filterProjects,
    resetFilters,

    // Pagination
    changePage,
    changePageSize,
  };
}