import { createSlice } from '@reduxjs/toolkit';
import { login } from '../loginSlice';
import mergeBasket from './mergeBasket';
import changeQuantityInBasket from './changeQuantity';
import deleteFromBasket from './deleteFromBasket';

const calcBasketPriceSum = (productsInBasket) =>
  productsInBasket.reduce(
    (sum, { product, cartQuantity }) =>
      product.currentPrice * cartQuantity + sum,
    0
  );

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
    closeModalBasket: (state) => {
      state.modal = false;
      state.modalText = '';
      state.modalAdd = false;
    },
    clearBasket: (state) => {
      state.itemsBasket = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      action.asyncDispatch(mergeBasket());
    });
    builder.addCase(mergeBasket.fulfilled, (state, { payload: cart }) => {
      state.itemsBasket = cart;
      state.priceAll = calcBasketPriceSum(state.itemsBasket);
    });
    builder.addCase(
      changeQuantityInBasket.fulfilled,
      (state, { payload: cart }) => {
        state.itemsBasket = cart;
        state.priceAll = calcBasketPriceSum(cart);
      }
    );
    builder.addCase(
      changeQuantityInBasket.rejected,
      (state, { payload: { error, type, message } }) => {
        if (type === 'quantityError') {
          state.modalText = message;
          state.modal = true;
        } else {
          console.log(error);
        }
      }
    );
    builder.addCase(deleteFromBasket.fulfilled, (state, { payload: cart }) => {
      state.itemsBasket = cart;
      state.priceAll = calcBasketPriceSum(cart);
    });
  },
});

export const {
  addToBasket,
  deleteBasket,
  clearBasket,
  minusItem,
  addSeveraltoBasket,
  closeModalBasket,
  updateBasket,
} = basketSlice.actions;

export default basketSlice.reducer;
