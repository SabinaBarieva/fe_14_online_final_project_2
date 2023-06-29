import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  errors: [],
};

const errorsSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    setErrorMessage: (state, action) => {
      state.errors.push(action.payload.error);
    },
    removeErrorMessage: (state, action) => {
      state.errors.splice(action.payload, 1);
    },
    clearErrors: (state) => {
      state.errors = [];
    },
  },
});

export const { setErrorMessage, removeErrorMessage, clearErrors } =
  errorsSlice.actions;
export default errorsSlice.reducer;
