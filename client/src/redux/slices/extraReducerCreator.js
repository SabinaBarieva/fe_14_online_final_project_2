const extraReducerCreator =
  (builder) =>
  (thunk, resultKeyName = 'result') => {
    builder.addCase(thunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(thunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state[resultKeyName] = payload;
    });
    builder.addCase(thunk.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error;
    });
  };
export const initialStateCreator = (resultKeyName = 'result') => ({
  isLoading: false,
  [resultKeyName]: null,
  error: null,
});
export default extraReducerCreator;
