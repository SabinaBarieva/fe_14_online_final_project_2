import { createSlice } from '@reduxjs/toolkit';
import fetchApi from '../../api/fetchApi';
import { productsEP } from '../../api/constants';
import { handleAppError2 } from '../../errors/errors';

const allProdsSlice = createSlice({
  name: 'allProducts',
  initialState: {
    allProds: [],
    isFetching: false,
    isFetched: false,
  },
  reducers: {
    startGetArray: (state) => {
      state.isFetching = true;
    },
    finishGetArray: (state, action) => {
      state.isFetching = false;
      state.isFetched = true;
      state.allProds = action.payload;
    },
    errorGetArray: (state) => {
      state.isFetching = false;
    },
  },
});

export default allProdsSlice.reducer;
export const { startGetArray, finishGetArray, errorGetArray } =
  allProdsSlice.actions;

export const getAllSaleProducts = () => async (dispatch) =>
  handleAppError2(dispatch)(async () => {
    dispatch(startGetArray());
    try {
      const resultArray = await fetchApi(productsEP);
      const saleArray = resultArray.filter((product) => product.saleImg);
      dispatch(finishGetArray(saleArray));
    } catch (error) {
      dispatch(
        errorGetArray({
          error: error.message,
        })
      );
    }
  });

//   dispatch(startGetArray());
//   try {
//     const resultArray = await fetchApi(productsEP);
//     const saleArray = resultArray.filter((product) => product.saleImg);
//     dispatch(finishGetArray(saleArray));
//   } catch (error) {
//     dispatch(
//       errorGetArray({
//         error: error.message,
//       })
//     );
//     handleAppError(dispatch)(error);

// dispatch(
//   setErrorMessage({
//     error: error.message,
//   })
// );
//   }
// };

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import getProductApi from '../../api/getProduct';

// export const getAllProducts = createAsyncThunk(
//   'allProducts/getAllProducts',
//   console.log('app prods Should feched'),
//   async (itemNo) => getProductApi(itemNo)
// );

// export const allProductSlice = createSlice({
//   name: 'allProducts',
//   initialState: {
//     products: [],
//     isLoading: null,
//     error: null,
//   },
//   extraReducers: (builder) => {
//     builder.addCase(getAllProducts.pending, (state) => {
//       state.isLoading = true;
//     });
//     builder.addCase(getAllProducts.fulfilled, (state, action) => {
//       state.isLoading = false;
//       state.products = action.payload;
//     });
//     builder.addCase(getAllProducts.rejected, (state, action) => {
//       state.isLoading = false;
//       state.error = action.error;
//     });
//   },
// });

// export default allProductSlice.reducer;
