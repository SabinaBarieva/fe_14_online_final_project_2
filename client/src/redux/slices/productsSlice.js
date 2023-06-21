import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import getProducts from '../../api/getProducts';
// import { setErrorMessage } from './errorsSlice';

const initialState = {
  products: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const {
  setProducts
} = productsSlice.actions;

export default productsSlice.reducer;

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, { dispatch, rejectWithValue }) => {
    // const resnonse = await fetch("./collection.json");
    // const data = await resnonse.json();
    // dispatch(updateProducts(data));
    dispatch(setProducts(["qwe"]))
  }
);


//   ({ categories = [], perPage = 10, startPage = 1 }) =>
//   async (dispatch) => {
//     dispatch(startFetchingProducts());
//     try {
//       const result = await getProducts({
//         categories,
//         startPage,
//         perPage,
//       });
//       dispatch(
//         finishFetchingProducts({
//           products: result.products,
//           total: result.productsQuantity,
//         })
//       );
//     } catch (e) {
//       dispatch(
//         errorFetchingProducts({
//           error: e.message,
//         })
//       );
//       dispatch(
//         setErrorMessage({
//           error: e.message,
//         })
//       );
//     }
//   };
