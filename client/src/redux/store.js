import { configureStore } from '@reduxjs/toolkit';
import productsSlice from './slices/productsSlice';
import categoriesSlice from './slices/categoriesSlice';
import errorsSlice from './slices/errorsSlice';
import sliceModal from './slices/modalSlice';
import sliceForm from './slices/formSlice';
import productSlice from './slices/productSlice';
import { productsApi } from './productsApi';

const store = configureStore({
  reducer: {
    products: productsSlice,
    categories: categoriesSlice,
    errors: errorsSlice,
    toolkitModal: sliceModal,
    toolkitForm: sliceForm,
    product: productSlice,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

export default store;
