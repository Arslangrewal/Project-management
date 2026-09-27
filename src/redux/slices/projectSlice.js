// src/redux/slices/projectSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import projectService from "@/services/projectService";

/* -------------------------------------------------------------------------- */
/*                               Async Thunks                                 */
/* -------------------------------------------------------------------------- */

// Fetch all projects
export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (_, thunkAPI) => {
    try {
      return projectService.getProjects();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Create Project
export const createProject = createAsyncThunk(
  "projects/createProject",
  async (projectData, thunkAPI) => {
    try {
      return projectService.createProject(projectData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update Project
export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async ({ id, data }, thunkAPI) => {
    try {
      return projectService.updateProject(id, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete Project
export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (id, thunkAPI) => {
    try {
      projectService.deleteProject(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Archive Project
export const archiveProject = createAsyncThunk(
  "projects/archiveProject",
  async (id, thunkAPI) => {
    try {
      return projectService.archiveProject(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/* -------------------------------------------------------------------------- */
/*                              Initial State                                 */
/* -------------------------------------------------------------------------- */

const initialState = {
  projects: [],

  selectedProject: null,

  loading: false,

  error: null,

  search: "",

  filters: {
    status: "All",
    priority: "All",
    manager: "All",
  },

  pagination: {
    currentPage: 1,
    pageSize: 10,
  },
};

/* -------------------------------------------------------------------------- */
/*                                   Slice                                    */
/* -------------------------------------------------------------------------- */

const projectSlice = createSlice({
  name: "projects",

  initialState,

  reducers: {
    setSelectedProject(state, action) {
      state.selectedProject = action.payload;
    },

    clearSelectedProject(state) {
      state.selectedProject = null;
    },

    setSearch(state, action) {
      state.search = action.payload;
      state.pagination.currentPage = 1;
    },

    setFilters(state, action) {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };

      state.pagination.currentPage = 1;
    },

    clearFilters(state) {
      state.search = "";

      state.filters = {
        status: "All",
        priority: "All",
        manager: "All",
      };
    },

    setCurrentPage(state, action) {
      state.pagination.currentPage = action.payload;
    },

    setPageSize(state, action) {
      state.pagination.pageSize = action.payload;
      state.pagination.currentPage = 1;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ---------------- Fetch ---------------- */

      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })

      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------------- Create ---------------- */

      .addCase(createProject.pending, (state) => {
        state.loading = true;
      })

      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.unshift(action.payload);
      })

      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------------- Update ---------------- */

      .addCase(updateProject.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.projects.findIndex(
          (project) => project.id === action.payload.id
        );

        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      })

      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------------- Delete ---------------- */

      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;

        state.projects = state.projects.filter(
          (project) => project.id !== action.payload
        );
      })

      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------------- Archive ---------------- */

      .addCase(archiveProject.pending, (state) => {
        state.loading = true;
      })

      .addCase(archiveProject.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.projects.findIndex(
          (project) => project.id === action.payload.id
        );

        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      })

      .addCase(archiveProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

/* -------------------------------------------------------------------------- */
/*                                  Exports                                   */
/* -------------------------------------------------------------------------- */

export const {
  setSelectedProject,
  clearSelectedProject,
  setSearch,
  setFilters,
  clearFilters,
  setCurrentPage,
  setPageSize,
} = projectSlice.actions;

export default projectSlice.reducer;