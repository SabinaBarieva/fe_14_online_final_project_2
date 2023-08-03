import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  errors: [],
};

const errorsSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    setErrorMessage: (state, { payload: { error } }) => {
      if (!state.errors.includes(error)) state.errors.push(error);
    },
    removeErrorMessage: (state) => {
      if (state.errors.length > 0) state.errors.shift();
    },
    clearErrors: () => initialState,
  },
});

export const { setErrorMessage, removeErrorMessage, clearErrors } =
  errorsSlice.actions;
export default errorsSlice.reducer;
