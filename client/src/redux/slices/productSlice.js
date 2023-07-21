import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getProductApi from '../../api/getProduct';

const stateName = 'product'
export const getProduct = createAsyncThunk(
  'product/getProduct',
  async (itemNo) => getProductApi(itemNo)
);

export const productSlice = createSlice({
  name: 'product',
  initialState: initialStateCreator(stateName),
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
    },
  },
  extraReducers: (builder) => {
    extraReducerCreator(builder)(getProduct, stateName);
  },
});

export const { setProduct } = productSlice.actions;

export default productSlice.reducer;
