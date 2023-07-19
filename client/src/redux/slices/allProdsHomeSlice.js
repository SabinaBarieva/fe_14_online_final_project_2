import { createSlice } from '@reduxjs/toolkit';
import fetchApi from '../../api/fetchApi';
import { productsEP } from '../../api/constants';
import { setErrorMessage } from './errorsSlice';

const allProdsHomeSlice = createSlice({
  name: 'allProductsHome',
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

export default allProdsHomeSlice.reducer;
export const { startGetArray, finishGetArray, errorGetArray } =
  allProdsHomeSlice.actions;

export const getAllHomeProducts = () => async (dispatch) => {
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
