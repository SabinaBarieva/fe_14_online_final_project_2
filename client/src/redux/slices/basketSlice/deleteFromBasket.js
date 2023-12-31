import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../../../localstorage/localstorage';
import { deleteFromCart } from '../../../api/cart';

const deleteFromBasket = createAsyncThunk(
  'delete-from-basket',
  async ({ productToDelete }, { getState }) => {
    const idKey = ['_id'];
    const cart = JSON.parse(JSON.stringify(getState().basket.itemsBasket));
    const isLoggedIn = getToken() && true;
    if (isLoggedIn) {
      const remoteBasket = await deleteFromCart(productToDelete[idKey]);
      return remoteBasket.products;
    }
    return cart.filter(
      ({ product }) => product.itemNo !== productToDelete.itemNo
    );
  }
);
export const deleteFromBasketActionCreator = (product) =>
  deleteFromBasket({ productToDelete: product });
export default deleteFromBasket;
