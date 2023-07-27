import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../../../localstorage/localstorage';
import findProductInBasket from './findProductInBasket';
import { AppError } from '../../../errors/errors';
import { deleteFromCart, updateCart } from '../../../api/cart';
import createRemoteCartProduct from './createRemoteCartProduct';
import basketProductCreator from './basketProductCreator';

const changeQuantityInBasket = createAsyncThunk(
  'decrease-quantity-in-basket',
  async ({ product, addToBasketQuantity }, { getState, rejectWithValue }) => {
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
    if (isLoggedIn) {
      const remoteCart =
        newQuantityInBasket === 0
          ? await deleteFromCart(product[idKey])
          : await updateCart(
              createRemoteCartProduct(product, newQuantityInBasket)
            );
      return remoteCart;
    }
    if (currentProductInBasket)
      currentProductInBasket.cartQuantity = newQuantityInBasket;
    else
      cart.push(
        basketProductCreator({ product, cartQuantity: newQuantityInBasket })
      );

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
