import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getProductsFilters from '../../api/getProductsFilters';
import { setErrorMessage } from './errorsSlice';

const initialState = {
  categories: [],
  minPrice: null,
  maxPrice: null,
  availableFilters: {},
  isLoading: false,
  isLoaded: false,
};

export const fetchFilters = createAsyncThunk(
  'filters/fetch',
  async (_, { dispatch }) => {
    try {
      const filters = await getProductsFilters();
      return filters;
    } catch (error) {
      dispatch(setErrorMessage({ error: error.message }));
      throw error;
    }
  }
);
const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    addCategory: ({ categories }, { payload: { category } }) => {
      if (!categories.includes(category)) categories.push(category);
    },
    removeCategory: ({ categories }, { payload: { category } }) => {
      const categoryIndex = categories.findIndex(
        (arrayItem) => arrayItem === category
      );
      if (categoryIndex > -1) categories.splice(categoryIndex, 1);
    },

    setMinPrice: (state, { payload: { price } }) => {
      state.minPrice = price;
    },
    setMaxPrice: (state, { payload: { price } }) => {
      state.maxPrice = price;
    },
    resetFilters: (state) => ({
      ...initialState,
      availableFilters: { ...state.availableFilters },
      isLoaded: state.isLoaded,
      isLoading: state.isLoading,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFilters.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchFilters.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoaded = true;
      state.availableFilters = action.payload;
    });
    builder.addCase(fetchFilters.rejected, (state) => {
      state.isLoading = false;
      state.isLoaded = false;
    });
  },
});

const {
  addCategory: addCategoryAction,
  removeCategory: removeCategoryAction,
  setMinPrice: setMinPriceAction,
  setMaxPrice: setMaxPriceAction,
} = filtersSlice.actions;
export const addCategory = (category) => addCategoryAction({ category });
export const removeCategory = (category) => removeCategoryAction({ category });
export const setMinPrice = (price) => setMinPriceAction({ price });
export const setMaxPrice = (price) => setMaxPriceAction({ price });
export const { resetFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
