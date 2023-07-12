import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: true,
  text: '',
};
const modalInProduct = createSlice({
  name: 'alertmodal',
  initialState,
  reducers: {
    openModal(state, action) {
      state.isOpen = true;
      state.text = `Hlo`;
    },
    closeModal(state) {
      state.statusModal = false;
    },
  },
});
export const { openModal, closeModal } = modalInProduct.actions;
export default modalInProduct.reducer;
