import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCart, updateCart } from '../../../api/cart';
import createRemoteCartProduct from './createRemoteCartProduct';
import { getToken } from '../../../localstorage/localstorage';
import { handleAppError2 } from '../../../errors/errors';

const mergeBasket = createAsyncThunk(
  'basket/merge',
  async (_, { getState, dispatch }) => {
    const isLoggedIn = getToken() && true;

    const idKey = '_id';
    const localBasket = getState().basket.itemsBasket;
    const remoteBasket = isLoggedIn
      ? await handleAppError2(dispatch)(async () => getCart())
      : [];
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
    return handleAppError2(dispatch)(async () => {
      await updateCart(cartToUpdate);
      const cart = await getCart();
      return cart;
    });
  }
);
export default mergeBasket;
