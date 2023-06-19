import { configureStore } from '@reduxjs/toolkit';
import testSlice from './slices/testSlice';
import productsSlice from './slices/productsSlice';
import categoriesSlice from './slices/categoriesSlice';
import errorsSlice from './slices/errorsSlice';
import sliceModal from './slices/reducersModal.js';
import sliceForm from './slices/reducersForm.js';

const store = configureStore({
  reducer: {
    test: testSlice,
    products: productsSlice,
    categories: categoriesSlice,
    errors: errorsSlice,
    toolkitModal: sliceModal,
    toolkitForm: sliceForm,
  },
});

export default store;
