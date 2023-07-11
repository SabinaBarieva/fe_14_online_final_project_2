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
