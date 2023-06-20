import { createSlice } from '@reduxjs/toolkit';
import getCurrentProduct from '../../api/getProduct';
import { setErrorMessage } from './errorsSlice';

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
  try {
    const product = await getCurrentProduct(itemNo);
    dispatch(
      finishFetchingCurrentProduct({
        product,
      })
    );
  } catch (error) {
    dispatch(errorFetchingProduct());
    dispatch(
      setErrorMessage({
        error: error.message,
      })
    );
  }
};
