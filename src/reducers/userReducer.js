import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    addUser: (state, action) => {
      state.push({ id: Date.now(), name: action.payload.name, email: action.payload.email });
    },
    deleteUser: (state, action) => {
      return state.filter((user) => user.id !== action.payload);
    },
    updateUser: (state, action) => {
      const user = state.find((user) => user.id === action.payload.id);
      if (user) {
        user.name = action.payload.name;
        user.email = action.payload.email;
      }
    },
  },
});

export const { addUser, deleteUser, updateUser } = userSlice.actions;
export default userSlice.reducer;