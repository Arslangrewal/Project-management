import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  loading: false,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },

    addUser: (state, action) => {
      state.users.push(action.payload);
    },

    updateUserRole: (state, action) => {
      const { id, role } = action.payload;

      const user = state.users.find(
        (u) => u.id === id
      );

      if (user) {
        user.role = role;
      }
    },

    deleteUser: (state, action) => {
      state.users = state.users.filter(
        (user) => user.id !== action.payload
      );
    },
  },
});

export const {
  setUsers,
  addUser,
  updateUserRole,
  deleteUser,
} = usersSlice.actions;

export default usersSlice.reducer;