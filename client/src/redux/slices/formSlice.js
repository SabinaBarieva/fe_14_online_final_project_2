import { createSlice } from '@reduxjs/toolkit';

const sliceForm = createSlice({
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
    closeForm(state) {
      state.statusForm = false;
      state.statusButton = false;
    },
    openApp(state) {
      state.statusForm = false;
      state.statusButton = true;
    },
  },
});

export default sliceForm.reducer;
export const { openForm, closeForm, openApp } = sliceForm.actions;
