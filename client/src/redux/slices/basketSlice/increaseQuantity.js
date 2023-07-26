import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../../../localstorage/localstorage';
import findProductInBasket from './findProductInBasket';
import createRemoteCartProduct from './createRemoteCartProduct';
import { updateCart } from '../../../api/cart';
import basketProductCreator from './basketProductCreator';
import { AppError } from '../../../errors/errors';

const increaseQuantity = createAsyncThunk(
  'add-to-basket',
  async ({ product, addToBasketQuantity }, { getState, rejectWithValue }) => {
    const isLoggedIn = getToken() && true;
    const cart = JSON.parse(JSON.stringify(getState().basket.itemsBasket));
    const currentProductInBasket = findProductInBasket(product, cart);
    const productQuantityInBasket = currentProductInBasket
      ? currentProductInBasket.cartQuantity
      : 0;

    // const addToBasketQuantity = cartQuantity;
    const availableQuantity = product.quantity;
    let newQuantityInBasket = productQuantityInBasket + addToBasketQuantity;
    if (newQuantityInBasket > availableQuantity)
      rejectWithValue(
        new AppError(
          `Sorry, there are only ${availableQuantity} units of this product in stock`,
          { context: { type: 'quantityError' } }
        )
      );
    if (newQuantityInBasket < 0) newQuantityInBasket = 0;
    if (isLoggedIn) {
      const remoteCart = await updateCart(
        createRemoteCartProduct(product, newQuantityInBasket)
      );
      return remoteCart;
    }
    if (currentProductInBasket) {
      currentProductInBasket.cartQuantity = newQuantityInBasket;
    } else {
      cart.push(
        basketProductCreator({ product, cartQuantity: addToBasketQuantity })
      );
    }
    return cart;
  }
);

export default increaseQuantity;
