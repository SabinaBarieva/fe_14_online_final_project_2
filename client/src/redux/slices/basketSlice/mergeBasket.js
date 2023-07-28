import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCart, updateCart } from '../../../api/cart';
import createRemoteCartProduct from './createRemoteCartProduct';
import { getToken } from '../../../localstorage/localstorage';

const mergeBasket = createAsyncThunk(
  'basket/merge',
  async (_, { getState }) => {
    const isLoggedIn = getToken() && true;
    try {
      const idKey = '_id';
      const localBasket = getState().basket.itemsBasket;

      const remoteBasket = isLoggedIn ? await getCart() : [];
      const cartToUpdate = remoteBasket.map(({ product, cartQuantity }) =>
        createRemoteCartProduct(product, cartQuantity)
      );
      localBasket.forEach(
        ({ product: localProduct, cartQuantity: localQuantity }) => {
          const productId = localProduct[idKey];
          const foundedProduct = cartToUpdate.find(
            ({ product: remoteId }) => remoteId === productId
          );
          if (foundedProduct) {
            const remoteQuantity = foundedProduct.cartQuantity;
            if (localQuantity < remoteQuantity)
              foundedProduct.cartQuantity = remoteQuantity;
            else if (remoteQuantity < localQuantity)
              foundedProduct.cartQuantity = localQuantity;
          } else
            cartToUpdate.push(
              createRemoteCartProduct(localProduct, localQuantity)
            );
        }
      );
      await updateCart(cartToUpdate);
      const cart = await getCart();
      //   console.log(cart);
      return cart;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
export default mergeBasket;
