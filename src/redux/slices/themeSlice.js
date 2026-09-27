import { createSlice } from "@reduxjs/toolkit";

const initialTheme =
  typeof window !== "undefined"
    ? localStorage.getItem("theme") || "light"
    : "light";

const themeSlice = createSlice({
  name: "theme",

  initialState: {
    mode: initialTheme,
  },

  reducers: {
    toggleTheme: (state) => {
      state.mode =
        state.mode === "light"
          ? "dark"
          : "light";

      localStorage.setItem(
        "theme",
        state.mode
      );
    },
  },
});

export const { toggleTheme } =
  themeSlice.actions;

export default themeSlice.reducer;