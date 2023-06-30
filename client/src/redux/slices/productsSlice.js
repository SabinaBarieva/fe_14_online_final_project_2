import { createSlice } from '@reduxjs/toolkit';
import getProducts from '../../api/getProducts';
import { setErrorMessage } from './errorsSlice';

const initialState = {
  products: [],
  total: undefined,
  isFetching: false,
  isFetched: false,
};
// const getProducts = createAsyncThunk();
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
      state.total = action.payload.total;
    },
    errorFetchingProducts: (state) => {
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
  ({ categories = [], perPage = 10, startPage = 1 }) =>
  async (dispatch) => {
    dispatch(startFetchingProducts());
    try {
      const result = await getProducts({
        categories,
        startPage,
        perPage,
      });
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
      dispatch(
        setErrorMessage({
          error: e.message,
        })
      );
    }
  };
