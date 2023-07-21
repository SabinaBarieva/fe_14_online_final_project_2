import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getProductApi from '../../api/getProduct';

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
  },
  extraReducers: (builder) => {
    builder.addCase(getProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
    });
    builder.addCase(getProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const { setProduct } = productSlice.actions;

export default productSlice.reducer;
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import getProductApi from '../../api/getProduct';
// import extraReducerCreator, {
//   initialStateCreator,
// } from './extraReducerCreator';

// const stateName = 'product';

// export const getProduct = createAsyncThunk(
//   'product/getProduct',
//   async (itemNo) => getProductApi(itemNo)
// );

// export const productSlice = createSlice({
//   name: 'product',
//   initialState: initialStateCreator(stateName),
//   reducers: {
//     setProduct: (state, action) => {
//       state.product = action.payload;
//     },
//     clearProduct: (state) => {
//       state.product = null;
//     },
//   },
//   extraReducers: (builder) => {
//     extraReducerCreator(builder)(getProduct, stateName);
//   },
// });

// export const { setProduct } = productSlice.actions;

// export default productSlice.reducer;
