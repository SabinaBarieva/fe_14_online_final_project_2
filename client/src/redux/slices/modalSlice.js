import { createSlice } from '@reduxjs/toolkit';

const sliceModal = createSlice({
  name: 'modal',
  initialState: {
    statusOrder: '',
    statusModal: false,
    text: '',
  },
  reducers: {
    orderBasket(state, action) {
      state.statusOrder = 'Ordered';
      state.statusModal = true;
      state.text = `Dear, ${action.payload.firstName} ${action.payload.lastName}. 
                Thank you for your purchase.
                The parcel number will be sent to the ${action.payload.email}.`;
    },
    closeModal(state) {
      state.statusModal = false;
    },
  },
});

export default sliceModal.reducer;
export const { orderBasket, closeModal } = sliceModal.actions;
