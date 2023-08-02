import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getProductApi from '../../api/getProduct';
import extraReducerCreator from './extraReducerCreator';
import { handleAppError2 } from '../../errors/errors';

export const getProduct = createAsyncThunk(
  'product/getProduct',
  async (itemNo, { dispatch }) =>
    handleAppError2(dispatch)(() => getProductApi(itemNo))
  // try {
  //   const product = await getProductApi(itemNo);
  //   return product;
  // } catch (error) {
  //   handleAppError(dispatch)(error);
  //   throw error;
  // }
);

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    product: {},
    isLoading: null,
    error: null,
  },
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    clearProduct: (state) => {
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    extraReducerCreator(builder)(getProduct, 'product');
  },
});

export const { setProduct, clearProduct } = productSlice.actions;

export default productSlice.reducer;
