import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  priceAll: 0,
  itemsBasket: [],
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
          window.confirm(
            'Sorry, the product you have chosen is no longer in stock.'
          );
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
    },
    deleteBasket: (state, action) => {
      state.itemsBasket = state.itemsBasket.filter(
        (item) => item.itemNo !== action.payload.itemNo
      );
    },
    clearBasket(state) {
      state.itemsBasket = [];
      state.priceAll = [];
    },
    addSeveraltoBasket: (state, action) => {
      const seachItem = state.itemsBasket.find(
        (item) => item.itemNo === action.payload.itemNo
      );
      if (seachItem) {
        if (
          action.payload.count + seachItem.count > seachItem.quantity &&
          seachItem.quantity - seachItem.count !== 0
        ) {
          alert(
            `ДЕМО СТРОКА! можна додати ще не більше ніж ${
              seachItem.quantity - seachItem.count
            } до вже вибраної кількості товарів`
          );
        }
        if (seachItem.count !== seachItem.quantity) {
          seachItem.count += action.payload.count;
        } else {
          window.confirm(
            'Sorry, the product you have chosen is no longer in stock.'
          );
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
  },
});
export const {
  addToBasket,
  deleteBasket,
  clearBasket,
  minusItem,
  addSeveraltoBasket,
} = basketSlice.actions;
export default basketSlice.reducer;
