import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from './productsSlice';
import getCurrentProduct from '../../api/getProduct';

const initialState = {
  product: {},
  isFetching: false,
  isFetched: false,
};

const currentProductSlice = createSlice({
  name: 'currentProduct',
  initialState,
  reducers: {
    startFetchingCurrentProduct: (state) => {
      state.isFetching = true;
    },
    finishFetchingCurrentProduct: (state, action) => {
      state.isFetching = false;
      state.isFetched = true;
      console.log(action);
      state.product = action.payload.product;
    },
    errorFetchingProduct: (state) => {
      state.isFetching = false;
      state.isFetched = true;
    },
  },
});
const {
  startFetchingCurrentProduct,
  finishFetchingCurrentProduct,
  errorFetchingProduct,
} = currentProductSlice.actions;
export default currentProductSlice.reducer;

export const fetchProduct = (itemNo) => async (dispatch) => {
  dispatch(startFetchingCurrentProduct());
  const product = await getCurrentProduct(itemNo);
  dispatch(
    finishFetchingCurrentProduct({
      product,
    })
  );
};
