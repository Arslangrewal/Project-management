import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import authService from "@/services/authService";

const saveAuth = (auth) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("auth", JSON.stringify(auth));
  }
};

const removeAuth = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth");
  }
};

/**
 * createAsyncThunk:
 * Handles async requests:
 * Pending
 * Fulfilled
 * Rejected
 */

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      return await authService.login(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      return await authService.register(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async () => {
    return await authService.logout();
  }
);

const initialState = {
  user: null,
  token: null,
  session: null,

  roles: [],
  permissions: [],

  isAuthenticated: false,
  isHydrated: false,

  loading: false,
  error: null,
};

/**
 * createSlice:
 * Generates:
 * actions
 * reducers
 * action creators
 */

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    restoreSession: (state, action) => {
      const auth = action.payload || {};

      state.user = auth.user || null;
      state.token = auth.token || null;
      state.session = auth.session || null;
      state.roles = auth.roles || [];
      state.permissions = auth.permissions || [];
      state.isAuthenticated = Boolean(auth.isAuthenticated);
      state.isHydrated = true;
      state.loading = false;
      state.error = null;
    },

    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.session = null;
      state.roles = [];
      state.permissions = [];
      state.isAuthenticated = false;
      state.isHydrated = true;
      state.loading = false;
      state.error = null;

      removeAuth();
    },

    finishAuthHydration: (state) => {
      state.isHydrated = true;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.user;
        state.token = action.payload.token;
        state.session = action.payload.session;

        state.roles = action.payload.roles || [];
        state.permissions =
          action.payload.permissions || [];

        state.isAuthenticated = true;
        state.isHydrated = true;

        saveAuth({
          user: state.user,
          token: state.token,
          session: state.session,
          roles: state.roles,
          permissions: state.permissions,
          isAuthenticated: state.isAuthenticated,
        });
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.user;
        state.token = action.payload.token;
        state.session = action.payload.session;

        state.roles = action.payload.roles || [];
        state.permissions = action.payload.permissions || [];

        state.isAuthenticated = true;
        state.isHydrated = true;

        saveAuth({
          user: state.user,
          token: state.token,
          session: state.session,
          roles: state.roles,
          permissions: state.permissions,
          isAuthenticated: state.isAuthenticated,
        });
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.session = null;

        state.roles = [];
        state.permissions = [];

        state.isAuthenticated = false;
        state.isHydrated = true;

        removeAuth();
      });
  },
});

export const { restoreSession, clearAuth, finishAuthHydration } = authSlice.actions;

export default authSlice.reducer;
