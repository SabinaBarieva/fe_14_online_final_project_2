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
      state.error = error.message || error;
    });
  };
export const initialStateCreator = (
  resultKeyName = 'result',
  defaultValue = null
) => ({
  isLoading: false,
  [resultKeyName]: defaultValue,
  error: null,
});
export default extraReducerCreator;
