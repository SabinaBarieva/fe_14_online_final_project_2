import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpen: false,
  text: '',
};
const modalInProduct = createSlice({
  name: 'alertmodal',
  initialState,
  reducers: {
    openModal(state, action) {
      state.isModalOpen = true;
      state.text = `You can add not more than ${action.payload} products`;
    },
    closeModal(state) {
      state.isModalOpen = false;
      state.text = '';
    },
  },
});
export const { openModal, closeModal } = modalInProduct.actions;
export default modalInProduct.reducer;
