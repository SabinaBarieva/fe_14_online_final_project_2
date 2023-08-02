import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../../../localstorage/localstorage';
import findProductInBasket from './findProductInBasket';
import { AppError, handleAppError2 } from '../../../errors/errors';
import { deleteFromCart, updateCart } from '../../../api/cart';
import createRemoteCartProduct from './createRemoteCartProduct';
import basketProductCreator from './basketProductCreator';

const changeQuantityInBasket = createAsyncThunk(
  'change-quantity-in-basket',
  async (
    { product, addToBasketQuantity },
    { getState, rejectWithValue, dispatch }
  ) => {
    const idKey = '_id';
    const isLoggedIn = getToken() && true;
    const cart = JSON.parse(JSON.stringify(getState().basket.itemsBasket));
    const currentProductInBasket = findProductInBasket(product, cart);
    const productQuantityInBasket = currentProductInBasket
      ? currentProductInBasket.cartQuantity
      : 0;
    const availableQuantity = product.quantity;
    let newQuantityInBasket = productQuantityInBasket + addToBasketQuantity;
    if (newQuantityInBasket > availableQuantity) {
      return rejectWithValue({
        message: `Sorry, there are only ${availableQuantity} units of this product in stock`,
        type: 'quantityError',
      });
    }
    if (newQuantityInBasket < 0) newQuantityInBasket = 0;
    if (currentProductInBasket)
      currentProductInBasket.cartQuantity = newQuantityInBasket;
    else
      cart.push(
        basketProductCreator({ product, cartQuantity: newQuantityInBasket })
      );
    if (isLoggedIn) {
      const remoteCart = cart.map(({ product: currentProduct, cartQuantity }) =>
        createRemoteCartProduct(currentProduct, cartQuantity)
      );
      //   console.log(remoteCart);
      return handleAppError2(dispatch)(() => updateCart(remoteCart));
      //   const newCart = await updateCart(remoteCart);
      //   console.log(newCart);
      //   return newCart;
    }
    return cart;
  }
);

export const changeQuantityInBasketActionCreator = (
  product,
  addToBasketQuantity
) =>
  changeQuantityInBasket({
    ...basketProductCreator({ product, cartQuantity: 1 }),
    addToBasketQuantity,
  });

export default changeQuantityInBasket;
