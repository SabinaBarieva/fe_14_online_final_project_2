import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getProducts from '../../api/getProducts';
import { setErrorMessage } from './errorsSlice';

const initialState = {
  products: [],
  total: undefined,
  isFetching: false,
  isFetched: false,
};
export const fetchProductsSale = createAsyncThunk(
  'products/fetch',
  async (
    { categories = [], perPage = 500, startPage = 1, minPrice, maxPrice, sort },
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
const productsSaleSlice = createSlice({
  name: 'productsSale',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductsSale.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(fetchProductsSale.fulfilled, (state, { payload }) => {
      const { productsSale, productsQuantity } = payload;
      state.productsSale = productsSale;
      state.total = productsQuantity;
      state.isFetching = false;
      state.isFetched = true;
    });
    builder.addCase(fetchProductsSale.rejected, (state) => {
      state.isFetching = false;
      state.isFetched = false;
    });
  },
});

export default productsSaleSlice.reducer;
