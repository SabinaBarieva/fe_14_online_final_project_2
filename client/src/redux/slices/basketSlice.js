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
  },
});
export const { addToBasket, deleteBasket, clearBasket, minusItem } =
  basketSlice.actions;
export default basketSlice.reducer;
