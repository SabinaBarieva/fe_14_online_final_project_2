import { configureStore, combineReducers } from '@reduxjs/toolkit';
import testSlice from './slices/testSlice.js';
import sliceModal from './slices/reducersModal.js';
import sliceForm from './slices/reducersForm.js';

export const rootReducer = combineReducers({
  toolkitModal: sliceModal,
  toolkitForm: sliceForm,
  test: testSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export default store;
