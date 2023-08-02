import { createSlice } from '@reduxjs/toolkit';
import getCategories from '../../api/getCategories';
import { handleAppError2 } from '../../errors/errors';

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

export const fetchCategories = () => async (dispatch) =>
  handleAppError2(dispatch)(async () => {
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
    }
  });
//   dispatch(startFetchingCategories());
//   try {
//     const categories = await getCategories();
//     dispatch(
//       finishFetchingCategories({
//         categories,
//       })
//     );
//   } catch (error) {
//     dispatch(errorFetchingCategories());
// handleAppError(dispatch)(error);

// dispatch(
//   setErrorMessage({
//     error: error.message,
//   })
// );
//   }
// };
