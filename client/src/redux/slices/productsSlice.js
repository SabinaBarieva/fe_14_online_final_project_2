import { createSlice } from '@reduxjs/toolkit';
import getProducts from '../../api/getProducts';

const initialState = {
  products: [],
  total: undefined,
  isFetching: false,
  isFetched: false,
  errors: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    startFetchingProducts: (state) => {
      state.isFetching = true;
    },
    finishFetchingProducts: (state, action) => {
      state.isFetching = false;
      state.isFetched = true;
      state.products = action.payload.products;
    },
    errorFetchingProducts: (state, action) => {
      state.errors = action.payload.error;
      state.isFetching = false;
    },
  },
});
export const {
  startFetchingProducts,
  finishFetchingProducts,
  errorFetchingProducts,
} = productsSlice.actions;
export default productsSlice.reducer;
export const fetchProducts =
  (categories = []) =>
  async (dispatch) => {
    dispatch(startFetchingProducts());
    try {
      const result = await getProducts(categories);
      dispatch(
        finishFetchingProducts({
          products: result.products,
          total: result.productsQuantity,
        })
      );
    } catch (e) {
      dispatch(
        errorFetchingProducts({
          error: e.message,
        })
      );
    }
  };
