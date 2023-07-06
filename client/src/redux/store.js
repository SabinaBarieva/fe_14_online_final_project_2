import { configureStore } from '@reduxjs/toolkit';
import productsSlice from './slices/productsSlice';
import categoriesSlice from './slices/categoriesSlice';
import errorsSlice from './slices/errorsSlice';
import sliceModal from './slices/modalSlice';
import sliceForm from './slices/formSlice';
// eslint-disable-next-line import/no-named-as-default
import productSlice from './slices/productSlice';
import filtersSlice from './slices/filtersSlice';

const store = configureStore({
  reducer: {
    products: productsSlice,
    categories: categoriesSlice,
    errors: errorsSlice,
    toolkitModal: sliceModal,
    toolkitForm: sliceForm,
    product: productSlice,
    filters: filtersSlice,
  },
});

export default store;
