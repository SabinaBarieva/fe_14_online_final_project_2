import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCart, updateCart } from '../../../api/cart';
import createRemoteCartProduct from './createRemoteCartProduct';

const mergeBasket = createAsyncThunk(
  'basket/merge',
  async (_, { getState }) => {
    try {
      const idKey = '_id';
      const localBasket = getState().basket.itemsBasket;
      const remoteBasket = await getCart();
      //   if (remoteBasket === null) remoteBasket = [];
      //   else remoteBasket = remoteBasket.products;
      const cartToUpdate = [];
      localBasket.forEach(
        ({ product: localProduct, cartQuantity: localQuantity }) => {
          let totalQuantity = localQuantity;
          const productId = localProduct[idKey];
          const foundedProduct = remoteBasket.find(
            ({ product: { _id: remoteId } }) => remoteId === productId
          );
          if (foundedProduct) {
            const remoteQuantity = foundedProduct.cartQuantity;
            if (totalQuantity < remoteQuantity) totalQuantity += remoteQuantity;
          }
          cartToUpdate.push(
            createRemoteCartProduct(localProduct, totalQuantity)
          );
        }
      );
      const cart = await updateCart({ products: cartToUpdate });
      console.log(cart);
      return cart;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
export default mergeBasket;
