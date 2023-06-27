import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getProduct = createAsyncThunk(
  'product/getProduct',
  async (itemNo, { dispatch, rejectWithValue }) => {
    try {
      const resnonse = await fetch(`/api/products/${itemNo}`);
      if (!resnonse.ok) {
        throw new Error('!ServerError!');
      }
      const data = await resnonse.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
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
      state.error = action.payload;
    });
  },
});

export const { setProduct } = productSlice.actions;

export default productSlice.reducer;
