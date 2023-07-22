import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getProductApi from '../../api/getProduct';
import extraReducerCreator from './extraReducerCreator';

export const getProduct = createAsyncThunk(
  'product/getProduct',
  async (itemNo) => getProductApi(itemNo)
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
