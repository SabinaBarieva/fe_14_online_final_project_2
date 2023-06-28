import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getProductApi from '../../api/getProduct';

export const getProduct = createAsyncThunk(
  'product/getProduct',
  async (itemNo, { dispatch, rejectWithValue }) => getProductApi(itemNo)
);

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    product: {},
    isLoading: null,
    isLoaded: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoaded = true;
      state.product = action.payload;
    });
    builder.addCase(getProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isLoaded = false;
      state.error = action.error;
    });
  },
});

export const { setProduct } = productSlice.actions;

export default productSlice.reducer;
