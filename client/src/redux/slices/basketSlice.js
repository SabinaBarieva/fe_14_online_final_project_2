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
        (item) => item.id === action.payload.id
      );

      if (seachItem) {
        seachItem.count += 1;
      } else {
        state.itemsBasket.push({
          ...action.payload,
          count: 1,
        });
      }
      state.priceAll = state.itemsBasket.reduce(
        (sum, item) => item.price * item.count + sum,
        0
      );
    },
    minusItem: (state, action) => {
      const findItem = state.itemsBasket.find(
        (obj) => obj.id === action.payload.id
      );
      if (findItem) {
        findItem.count -= 1;
      }
    },
    deleteBasket: (state, action) => {
      state.itemsBasket = state.itemsBasket.filter(
        (item) => item.id !== action.payload.id
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
