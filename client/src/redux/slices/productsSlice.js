import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getProducts from '../../api/getProducts';
import { handleAppError2 } from '../../errors/errors';

const initialState = {
  products: [],
  total: undefined,
  isFetching: false,
  isFetched: false,
  sort: false,
};
export const fetchProducts = createAsyncThunk(
  'products/fetch',
  async ({ startPage, urlFilter }, { dispatch }) =>
    handleAppError2(dispatch)(() =>
      getProducts({
        startPage,
        urlFilter,
      })
    )
);
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    sortBy: (state, action) => {
      state.sort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, { payload }) => {
      const { products, productsQuantity } = payload;
      state.products = products;
      state.total = productsQuantity;
      state.isFetching = false;
      state.isFetched = true;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.isFetching = false;
      state.isFetched = false;
    });
  },
});

export const { sortBy } = productsSlice.actions;

export default productsSlice.reducer;
