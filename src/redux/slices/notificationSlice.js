import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

export const fetchNotifications =
  createAsyncThunk(
    "notifications/fetch",
    async (_, { rejectWithValue }) => {
      try {
        const res = await fetch("/api/notifications");
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        return res.json();
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

const notificationSlice = createSlice({
  name: "notifications",

  initialState: {
    items: [],
    unreadCount: 0,
    loading: false,
   
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })

      .addCase(
        fetchNotifications.fulfilled,
        (state, action) => {
          state.loading = false;
          state.items = action.payload;

          state.unreadCount =
            action.payload.filter(
              (item) => !item.read
            ).length;
        }
      );
  },
});

export default notificationSlice.reducer;