import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  priceAll: 0,
  itemsBasket: [],
  modal: false,
  modalText: '',
};
const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const seachItem = state.itemsBasket.find(
        (item) => item.itemNo === action.payload.itemNo
      );
      if (seachItem) {
        if (seachItem.count !== seachItem.quantity) {
          seachItem.count += 1;
        } else {
          state.modal = true;
          state.modalText = `Sorry, there are only ${seachItem.quantity} units of this product in stock`;
        }
      } else {
        state.itemsBasket.push({
          ...action.payload,
          count: 1,
        });
      }
      state.priceAll = state.itemsBasket.reduce(
        (sum, item) => item.currentPrice * item.count + sum,
        0
      );
    },
    minusItem: (state, action) => {
      const findItem = state.itemsBasket.find(
        (obj) => obj.itemNo === action.payload.itemNo
      );
      if (findItem) {
        findItem.count -= 1;
      }
      state.priceAll = state.itemsBasket.reduce(
        (sum, item) => item.currentPrice * item.count + sum,
        0
      );
    },
    deleteBasket: (state, action) => {
      state.itemsBasket = state.itemsBasket.filter(
        (item) => item.itemNo !== action.payload.itemNo
      );
      state.priceAll = state.itemsBasket.reduce(
        (sum, item) => item.currentPrice * item.count + sum,
        0
      );
    },
    clearBasket(state) {
      state.itemsBasket = [];
      state.priceAll = [];
    },
    // eslint-disable-next-line consistent-return
    addSeveraltoBasket: (state, action) => {
      const seachItem = state.itemsBasket.find(
        (item) => item.itemNo === action.payload.itemNo
      );
      if (seachItem) {
        if (
          action.payload.count + seachItem.count > seachItem.quantity &&
          seachItem.quantity - seachItem.count !== 0
        ) {
          state.modalText = `You can't add more than ${
            seachItem.quantity - seachItem.count
          }`;
          state.modal = true;
          return;
        }
        if (seachItem.count !== seachItem.quantity) {
          seachItem.count += action.payload.count;
        } else {
          state.modal = true;
          state.modalText = `Sorry, there are only ${seachItem.quantity} units of this product in stock`;
        }
      } else {
        state.itemsBasket.push({
          ...action.payload,
          count: action.payload.count,
        });
      }
      state.priceAll = state.itemsBasket.reduce(
        (sum, item) => item.currentPrice * item.count + sum,
        0
      );
    },
    closeModalBasket(state) {
      state.modal = false;
      state.modalText = '';
    },
  },
});
export const {
  addToBasket,
  deleteBasket,
  clearBasket,
  minusItem,
  addSeveraltoBasket,
  closeModalBasket,
} = basketSlice.actions;
export default basketSlice.reducer;
