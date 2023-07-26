import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login } from '../loginSlice';
import { getCart, updateCart } from '../../../api/cart';
// import { getCart, updateCart } from '../../api/cart';
import { getToken } from '../../../localstorage/localstorage';
import findProductInBasket from './findProductInBasket';
import mergeBasket from './mergeBasket';
import increaseQuantity from './increaseQuantity';
import { AppError } from '../../../errors/errors';
import changeQuantityInBasket from './changeQuantity';

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
    addToBasket: (state, { payload: currentProduct }) => {
      const { itemsBasket: basket } = state;
      const product = findProductInBasket(currentProduct, basket);
      if (product) {
        if (product.cartQuantity !== product.product.quantity) {
          product.cartQuantity += 1;
        } else {
          state.modal = true;
          state.modalText = `Sorry, there are only ${product.quantity} units of this product in stock`;
        }
      } else {
        basket.push({ ...currentProduct, cartQuantity: 1 });
      }
      state.priceAll = calcBasketPriceSum(basket);
    },
    minusItem: (state, { payload: currentProduct }) => {
      const { itemsBasket: basket } = state;
      const product = findProductInBasket(currentProduct, basket);
      if (product) {
        product.cartQuantity -= 1;
      }
      state.priceAll = calcBasketPriceSum(basket);
    },
    deleteBasket: (state, { payload: { product: productToDelete } }) => {
      state.itemsBasket = state.itemsBasket.filter(
        ({ product }) => product.itemNo !== productToDelete.itemNo
      );
      state.priceAll = calcBasketPriceSum(state.itemsBasket);
    },
    clearBasket: (state) => {
      state.itemsBasket = [];
      state.priceAll = 0;
    },
    addSeveraltoBasket: (state, { payload: currentProduct }) => {
      const { itemsBasket: basket } = state;
      const product = findProductInBasket(currentProduct, basket);
      if (product) {
        const totalProductToBasket =
          currentProduct.cartQuantity + product.cartQuantity;
        if (
          totalProductToBasket > product.product.quantity &&
          product.product.quantity - product.cartQuantity !== 0
        ) {
          state.modalText = `You can't add more than ${
            product.quantity - product.count
          }`;
          state.modal = true;
        } else if (product.cartQuantity !== product.product.quantity) {
          product.cartQuantity += currentProduct.cartQuantity;
        } else {
          state.modal = true;
          state.modalText = `Sorry, there are only ${product.quantity} units of this product in stock`;
        }
      } else {
        basket.push({
          ...currentProduct,
          cartQuantity: currentProduct.cartQuantity,
        });
      }
      state.priceAll = calcBasketPriceSum(basket);
    },
    closeModalBasket: (state) => {
      state.modal = false;
      state.modalText = '';
    },
    updateBasket: (state, { payload: products }) => {
      state.itemsBasket = products;
      state.priceAll = calcBasketPriceSum(products);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      action.asyncDispatch(mergeBasket());
    });
    builder.addCase(mergeBasket.fulfilled, (state, action) => {
      state.itemsBasket = action.payload;
      state.priceAll = calcBasketPriceSum(state.itemsBasket);
    });
    builder.addCase(increaseQuantity.fulfilled, (state, action) => {
      console.log(action.payload);
      state.itemsBasket = action.payload;
      state.priceAll = calcBasketPriceSum(action.payload);
    });
    builder.addCase(increaseQuantity.rejected, (state, { error }) => {
      console.log(error.context);
      if (error instanceof AppError && error.context === 'quantityError') {
        state.modalText = error.message;
        state.modal = true;
      } else {
        console.log(error);
      }
    });
    builder.addCase(changeQuantityInBasket.fulfilled, (state, action) => {
      console.log(action.payload);
      state.itemsBasket = action.payload;
      state.priceAll = calcBasketPriceSum(action.payload);
    });
    builder.addCase(increaseQuantity.rejected, (state, { error }) => {
      console.log(error.context);
      if (error instanceof AppError && error.context === 'quantityError') {
        state.modalText = error.message;
        state.modal = true;
      } else {
        console.log(error);
      }
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
