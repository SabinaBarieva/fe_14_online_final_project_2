import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isActive: false,
  text: "",
};

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    testReducer(state, action) {
      state.isActive = !state.isActive;
      state.text = "hlo";
    },
  },
});

export const { testReducer } = testSlice.actions;
export default testSlice.reducer;
