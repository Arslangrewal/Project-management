import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import analyticsReducer from "./slices/analyticsSlice";
import notificationReducer from "./slices/notificationSlice";
import themeReducer from "./slices/themeSlice";
import projectReducer from "./slices/projectSlice";
import taskReducer from "./slices/taskSlice";
import userReducer from "./slices/usersSlice";
import teamReducer from "./slices/teamSlice";

/**
 * configureStore:
 * - Automatically adds Redux DevTools
 * - Adds middleware
 * - Simplifies store setup
 */

export const store = configureStore({
  reducer: {
    auth: authReducer,
    analytics: analyticsReducer,
    notifications: notificationReducer,
    theme: themeReducer,
    projects: projectReducer,
    tasks: taskReducer,
    users: userReducer,
    teams: teamReducer,
  },
});

export default store;