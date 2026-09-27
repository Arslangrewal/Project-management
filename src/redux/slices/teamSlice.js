import { createSlice, createAsyncThunk, }from "@reduxjs/toolkit";
import {
    getTeams, getTeam, createTeam, updateTeam, deleteTeam } from "@/services/teamService";

/*
|--------------------------------------------------------------------------
| Async Thunks
|--------------------------------------------------------------------------
*/

export const fetchTeams = createAsyncThunk(
    "teams/fetchTeams",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getTeams();
            return response.data;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchTeam = createAsyncThunk(
    "teams/fetchTeam",
    async (id, { rejectWithValue }) => {
        try {
            const response = await getTeam(id);
            return response.data;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addTeam = createAsyncThunk(
    "teams/addTeam",
    async (teamData, { rejectWithValue }) => {
        try {
            const response = await createTeam(teamData);
            return response.data;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }   
    }
);

export const editTeam = createAsyncThunk(
  "teams/editTeam",
  async ({ id, teamData }, { rejectWithValue }) => {
    try {
      const response = await updateTeam(id, teamData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeTeam = createAsyncThunk(
  "teams/removeTeam",
  async (id, { rejectWithValue }) => {
    try {
      await deleteTeam(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/*
|--------------------------------------------------------------------------
| Initial State
|--------------------------------------------------------------------------
*/

const initialState = {
  teams: [],
  selectedTeam: null,
  loading: false,
  error: null,
};

/*
|--------------------------------------------------------------------------
| Slice
|--------------------------------------------------------------------------
*/

const teamSlice = createSlice({
  name: "teams",
  initialState,

  reducers: {
    clearSelectedTeam(state) {
      state.selectedTeam = null;
    },

    clearTeamError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // Fetch Teams
      .addCase(fetchTeams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.loading = false;
        state.teams = action.payload;
      })

      .addCase(fetchTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Team
      .addCase(fetchTeam.fulfilled, (state, action) => {
        state.selectedTeam = action.payload;
      })

      // Add Team
      .addCase(addTeam.fulfilled, (state, action) => {
        state.teams.push(action.payload);
      })

      // Edit Team
      .addCase(editTeam.fulfilled, (state, action) => {
        const index = state.teams.findIndex(
          (team) => team.id === action.payload.id
        );

        if (index !== -1) {
          state.teams[index] = action.payload;
        }

        if (
          state.selectedTeam &&
          state.selectedTeam.id === action.payload.id
        ) {
          state.selectedTeam = action.payload;
        }
      })

      // Delete Team
      .addCase(removeTeam.fulfilled, (state, action) => {
        state.teams = state.teams.filter(
          (team) => team.id !== action.payload
        );

        if (
          state.selectedTeam &&
          state.selectedTeam.id === action.payload
        ) {
          state.selectedTeam = null;
        }
      })

      // Shared Rejected Handler
      .addMatcher(
        (action) =>
          action.type.startsWith("teams/") &&
          action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // Shared Pending Handler
      .addMatcher(
        (action) =>
          action.type.startsWith("teams/") &&
          action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      // Shared Fulfilled Handler
      .addMatcher(
        (action) =>
          action.type.startsWith("teams/") &&
          action.type.endsWith("/fulfilled"),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export const {
  clearSelectedTeam,
  clearTeamError,
} = teamSlice.actions;

export default teamSlice.reducer;