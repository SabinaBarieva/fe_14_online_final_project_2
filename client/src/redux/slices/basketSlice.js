import { createSlice } from '@reduxjs/toolkit';

const calcBasketPriceSum = (productsInBasket) =>
  productsInBasket.reduce(
    (sum, product) => product.currentPrice * product.count + sum,
    0
  );
const findProductInBasket = (productToFind, productsInBasket) =>
  productsInBasket.find((product) => product.itemNo === productToFind.itemNo);

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
      console.log(basket);
      const product = findProductInBasket(currentProduct, basket);
      if (product) {
        if (product.count !== product.quantity) {
          product.count += 1;
        } else {
          state.modal = true;
          state.modalText = `Sorry, there are only ${product.quantity} units of this product in stock`;
        }
      } else {
        basket.push({
          ...currentProduct,
          count: 1,
        });
      }
      state.priceAll = calcBasketPriceSum(basket);
    },
    minusItem: (state, { payload: currentProduct }) => {
      const { itemsBasket: basket } = state;
      const product = findProductInBasket(currentProduct, basket);
      if (product) {
        product.count -= 1;
      }
      state.priceAll = calcBasketPriceSum(basket);
    },
    deleteBasket: (state, { payload: currentProduct }) => {
      let { basket } = state;
      basket = basket.filter(
        (product) => product.itemNo !== currentProduct.itemNo
      );
      state.priceAll = calcBasketPriceSum(basket);
    },
    clearBasket: (state) => {
      state.itemsBasket = [];
      state.priceAll = 0;
    },
    addSeveraltoBasket: (state, { payload: currentProduct }) => {
      const { itemsBasket: basket } = state;
      const product = findProductInBasket(currentProduct, basket);
      if (product) {
        const totalProductToBasket = currentProduct.count + product.count;
        if (
          totalProductToBasket > product.quantity &&
          product.quantity - product.count !== 0
        ) {
          state.modalText = `You can't add more than ${
            product.quantity - product.count
          }`;
          state.modal = true;
        } else if (product.count !== product.quantity) {
          product.count += currentProduct.count;
        } else {
          state.modal = true;
          state.modalText = `Sorry, there are only ${product.quantity} units of this product in stock`;
        }
      } else {
        basket.push({
          ...currentProduct,
          count: currentProduct.count,
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
