import { configureStore } from '@reduxjs/toolkit';
import productsSlice from './slices/productsSlice';
import categoriesSlice from './slices/categoriesSlice';
import errorsSlice from './slices/errorsSlice';
import modalSlice from './slices/modalSlice';
import formSlice from './slices/formSlice';
// eslint-disable-next-line import/no-named-as-default
import productSlice from './slices/productSlice';
import filtersSlice from './slices/filtersSlice';
import basketSlice from './slices/basketSlice';
import searchSlice from './slices/searchSlice';

const store = configureStore({
  reducer: {
    products: productsSlice,
    categories: categoriesSlice,
    errors: errorsSlice,
    modal: modalSlice,
    form: formSlice,
    product: productSlice,
    filters: filtersSlice,
    basket: basketSlice,
    search: searchSlice,
  },
});

export default store;
