import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openBurger: false,
};

const headerSlice = createSlice({
  name: 'burgerMenu',
  initialState,
  reducers: {
    burgerOpen(state) {
      state.openBurger = true;
    },
    burgerClose(state) {
      state.openBurger = false;
    },
  },
});

export const { burgerOpen, burgerClose } = headerSlice.actions;
export default headerSlice.reducer;
