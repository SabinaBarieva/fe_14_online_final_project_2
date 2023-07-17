import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import fetchApi from '../../api/fetchApi';
import { productsEP } from '../../api/constants';
import { setErrorMessage } from './errorsSlice';

export const fetchArrayProducts = createAsyncThunk(
  'searchList/fetchArrayProducts',
  async (_, { dispatch }) => {
    try {
      const resultArray = await fetchApi(productsEP);
      return resultArray;
    } catch (error) {
      dispatch(
        setErrorMessage({
          error: error.message,
        })
      );
      throw error;
    }
  }
);

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
    clearResultArray: (state) => {
      state.resultArray = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArrayProducts.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchArrayProducts.fulfilled, (state, action) => {
        state.isFetching = false;
        state.isFetched = true;
        state.resultArray = action.payload;
      })
      .addCase(fetchArrayProducts.rejected, (state) => {
        state.isFetching = false;
      });
  },
});

export const { finishGetArray, errorGetArray, clearResultArray } =
  searchListSlice.actions;

export default searchListSlice.reducer;
