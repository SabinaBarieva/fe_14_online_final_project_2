// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { setErrorMessage } from './errorsSlice';
// import postSearch from '../../api/postSearch';

// const startGetArray = () => ({
//   type: 'searchList/startGetArray',
// });

// export const fetchArrayProducts = createAsyncThunk(
//   'searchList/fetchArrayProducts',
//   async (value, { dispatch }) => {
//     dispatch(startGetArray());

//     try {
//       const resultArray = await postSearch(value);
//       return resultArray;
//     } catch (error) {
//       dispatch(
//         setErrorMessage({
//           error: error.message,
//         })
//       );
//       throw error;
//     }
//   }
// );

// const searchListSlice = createSlice({
//   name: 'searchList',
//   initialState: {
//     resultArray: [],
//     isFetching: false,
//     isFetched: false,
//   },
//   reducers: {
//     startGetArray: (state) => {
//       state.isFetching = true;
//     },
//     finishGetArray: (state, action) => {
//       state.isFetching = false;
//       state.isFetched = true;
//       state.resultArray = action.payload;
//     },
//     errorGetArray: (state) => {
//       state.isFetching = false;
//     },
//     clearResultArray: (state) => {
//       state.resultArray = [];
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(fetchArrayProducts.pending, (state) => {
//       state.isFetching = true;
//     });
//     builder.addCase(fetchArrayProducts.fulfilled, (state, action) => {
//       state.isFetching = false;
//       state.isFetched = true;
//       state.resultArray = action.payload;
//     });
//     builder.addCase(fetchArrayProducts.rejected, (state) => {
//       state.isFetching = false;
//     });
//   },
// });

// export const { finishGetArray, errorGetArray, clearResultArray } =
//   searchListSlice.actions;

// export default searchListSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import fetchApi from '../../api/fetchApi';
import { productsEP } from '../../api/constants';
import { setErrorMessage } from './errorsSlice';

const searchListSlice = createSlice({
  name: 'searchList',
  initialState: {
    resultArray: [],
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
      state.resultArray = action.payload;
    },
    errorGetArray: (state) => {
      state.isFetching = false;
    },
  },
});

export default searchListSlice.reducer;
export const { startGetArray, finishGetArray, errorGetArray } =
  searchListSlice.actions;

export const fetchArrayProducts = () => async (dispatch) => {
  dispatch(startGetArray());
  try {
    const resultArray = await fetchApi(productsEP);
    dispatch(finishGetArray(resultArray));
  } catch (error) {
    dispatch(
      errorGetArray({
        error: error.message,
      })
    );
    dispatch(
      setErrorMessage({
        error: error.message,
      })
    );
  }
};
