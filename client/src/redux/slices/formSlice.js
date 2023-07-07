import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
  name: 'form',
  initialState: {
    statusForm: false,
    statusButton: true,
  },
  reducers: {
    openForm(state) {
      state.statusForm = true;
      state.statusButton = false;
    },
    openApp(state) {
      state.statusForm = false;
      state.statusButton = true;
    },
  },
});

export default formSlice.reducer;
export const { openForm, openApp } = formSlice.actions;
