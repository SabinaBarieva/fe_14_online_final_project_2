import { createSlice } from '@reduxjs/toolkit';

export const basketProductCreator = ({ product, cartQuantity }) => ({
  product,
  cartQuantity,
});

const calcBasketPriceSum = (productsInBasket) =>
  productsInBasket.reduce(
    (sum, { product, cartQuantity }) =>
      product.currentPrice * cartQuantity + sum,
    0
  );
const findProductInBasket = (productToFind, productsInBasket) =>
  productsInBasket.find(
    ({ product }) => product.itemNo === productToFind.product.itemNo
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
    // mergeBasket:() {},
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
