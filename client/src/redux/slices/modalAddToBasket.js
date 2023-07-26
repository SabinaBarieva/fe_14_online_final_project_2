import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  statusModal: false,
  modaladdimg: '',
  modaladdname: '',
  product: '',
};
const modalAddToBasketSlice = createSlice({
  name: 'modalBasket',
  initialState,
  reducers: {
    modalAddBasket: (state, { payload: currentProduct }) => {
      state.statusModal = true;
      state.modaladdimg = currentProduct.imageUrls;
      state.modaladdname = currentProduct.name;
      state.product = currentProduct;
    },
    closeModalAddBasket: (state) => {
      state.statusModal = false;
    },
  },
});

export const { modalAddBasket, closeModalAddBasket } =
  modalAddToBasketSlice.actions;
export default modalAddToBasketSlice.reducer;
