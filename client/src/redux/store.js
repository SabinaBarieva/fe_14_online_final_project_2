import { configureStore } from '@reduxjs/toolkit';
import productsSlice from './slices/productsSlice';
import categoriesSlice from './slices/categoriesSlice';
import errorsSlice from './slices/errorsSlice';
import sliceModal from './slices/modalSlice';
import sliceForm from './slices/formSlice';
// eslint-disable-next-line import/no-named-as-default
import productSlice from './slices/productSlice';
import basketSlice from './slices/basketSlice';

const store = configureStore({
  reducer: {
    products: productsSlice,
    categories: 'cellphone' /* categoriesSlice */,
    errors: errorsSlice,
    toolkitModal: sliceModal,
    toolkitForm: sliceForm,
    product: productSlice,
    basket: basketSlice,
  },
});

export default store;
