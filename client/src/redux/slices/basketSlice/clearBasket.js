import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../../../localstorage/localstorage';
import { deleteCart } from '../../../api/cart';

const clearBasket = createAsyncThunk('clear-basket', async () => {
  const isLoggedIn = getToken() && true;
  if (isLoggedIn) {
    await deleteCart();
  }
  return [];
});

export default clearBasket;
