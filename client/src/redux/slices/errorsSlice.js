import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  errors: [],
};

const errorsSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    setErrorMessage: (state, action) => state.push(action.payload.message),
    removeErrorMessage: (state, action) => state.splice(action.payload, 1),
    clearErrors: (state) => {
      state.errors = [];
    },
  },
});

export const { setErrorMessage, removeErrorMessage, clearErrors } =
  errorsSlice.actions;
export default errorsSlice.reducer;
