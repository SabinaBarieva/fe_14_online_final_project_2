import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getProductApi from '../../api/getProduct';

export const getAllProducts = createAsyncThunk(
  'allProducts/getAllProducts',
  async (itemNo) => getProductApi(itemNo)
);

export const allProductSlice = createSlice({
  name: 'allProducts',
  initialState: {
    products: [],
    isLoading: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export default allProductSlice.reducer;
