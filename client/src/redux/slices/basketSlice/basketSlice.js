import { createSlice } from '@reduxjs/toolkit';
import { login } from '../loginSlice';
import mergeBasket from './mergeBasket';
import changeQuantityInBasket from './changeQuantity';
import deleteFromBasket from './deleteFromBasket';
import clearBasket from './clearBasket';

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
  isLoading: false,
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
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      action.asyncDispatch(mergeBasket());
    });

    builder.addCase(mergeBasket.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(mergeBasket.fulfilled, (state, { payload: cart }) => {
      state.isLoading = false;
      state.itemsBasket = cart;
      state.priceAll = calcBasketPriceSum(state.itemsBasket);
    });
    builder.addCase(mergeBasket.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(changeQuantityInBasket.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      changeQuantityInBasket.fulfilled,
      (state, { payload: cart }) => {
        state.isLoading = false;
        state.itemsBasket = cart;
        state.priceAll = calcBasketPriceSum(cart);
      }
    );
    builder.addCase(
      changeQuantityInBasket.rejected,
      (state, { payload: { error, type, message } }) => {
        state.isLoading = false;
        if (type === 'quantityError') {
          state.modalText = message;
          state.modal = true;
        } else {
          console.log(error);
        }
      }
    );

    builder.addCase(deleteFromBasket.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteFromBasket.fulfilled, (state, { payload: cart }) => {
      state.isLoading = false;
      state.itemsBasket = cart;
      state.priceAll = calcBasketPriceSum(cart);
    });
    builder.addCase(deleteFromBasket.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(clearBasket.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(clearBasket.fulfilled, (state) => {
      state.isLoading = false;
      state.itemsBasket = [];
      state.priceAll = 0;
    });
    builder.addCase(clearBasket.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { closeModalBasket } = basketSlice.actions;

export default basketSlice.reducer;
