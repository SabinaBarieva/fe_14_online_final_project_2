import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getProducts from '../../api/getProducts';
import { setErrorMessage } from './errorsSlice';

const initialState = {
  products: [],
  total: undefined,
  isFetching: false,
  isFetched: false,
};
export const fetchProducts = createAsyncThunk(
  'products/fetch',
  async (
    { categories = [], perPage = 10, startPage = 1, minPrice, maxPrice, sort },
    { dispatch }
  ) => {
    try {
      return await getProducts({
        categories,
        startPage,
        perPage,
        minPrice,
        maxPrice,
        sort,
      });
    } catch (error) {
      dispatch(
        setErrorMessage({
          error: error.message,
        })
      );
      throw error;
    }
  }
);
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
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

export default productsSlice.reducer;
