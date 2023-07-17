import { createSlice } from '@reduxjs/toolkit';
import getCategories from '../../api/getCategories';
import { setErrorMessage } from './errorsSlice';

const initialState = {
  isFetching: false,
  isFetched: false,
  categories: [],
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    startFetchingCategories: (state) => {
      state.isFetching = true;
    },
    finishFetchingCategories: (state, action) => {
      state.isFetching = true;
      state.isFetched = true;
      state.categories = action.payload.categories;
    },
    errorFetchingCategories: (state) => {
      state.isFetching = false;
      state.isFetched = false;
    },
  },
});

export const {
  startFetchingCategories,
  finishFetchingCategories,
  errorFetchingCategories,
} = categoriesSlice.actions;
export default categoriesSlice.reducer;

export const fetchCategories = () => async (dispatch) => {
  dispatch(startFetchingCategories());
  try {
    const categories = await getCategories();
    dispatch(
      finishFetchingCategories({
        categories,
      })
    );
  } catch (error) {
    dispatch(errorFetchingCategories());
    dispatch(
      setErrorMessage({
        error: error.message,
      })
    );
  }
};
