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
    const resnonse = await fetch("http://localhost:4000/api/products");
    const data = await resnonse.json();
    dispatch(setProducts(data))
  }
);


// import { createSlice } from '@reduxjs/toolkit';
// import getProducts from '../../api/getProducts';
// import { setErrorMessage } from './errorsSlice';

// const initialState = {
//   products: [],
//   total: undefined,
//   isFetching: false,
//   isFetched: false,
// };
// // const getProducts = createAsyncThunk();
// const productsSlice = createSlice({
//   name: 'products',
//   initialState,
//   reducers: {
//     startFetchingProducts: (state) => {
//       state.isFetching = true;
//     },
//     finishFetchingProducts: (state, action) => {
//       state.isFetching = false;
//       state.isFetched = true;
//       state.products = action.payload.products;
//       state.total = action.payload.total;
//     },
//     errorFetchingProducts: (state, action) => {
//       state.isFetching = false;
//     },
//   },
// });
// console.log(productsSlice);
// export const {
//   startFetchingProducts,
//   finishFetchingProducts,
//   errorFetchingProducts,
// } = productsSlice.actions;
// export default productsSlice.reducer;
// export const fetchProducts =
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