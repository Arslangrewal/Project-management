import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

export const fetchDashboardStats =
  createAsyncThunk(
    "analytics/stats",
    async (_, { rejectWithValue }) => {
      try {
        const res = await fetch("/api/dashboard");
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        return res.json();
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

export const fetchAnalytics =
  createAsyncThunk(
    "analytics/charts",
    async (_, { rejectWithValue }) => {
      try {
        const res = await fetch("/api/analytics");
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        return res.json();
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

const analyticsSlice = createSlice({
  name: "analytics",

  initialState: {
    metrics: {},
    chartData: {},
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchDashboardStats.fulfilled,
        (state, action) => {
          state.loading = false;
          state.metrics = action.payload;
        }
      )
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAnalytics.fulfilled,
        (state, action) => {
          state.loading = false;
          state.chartData = action.payload;
        }
      )
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default analyticsSlice.reducer;