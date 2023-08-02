import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../../../localstorage/localstorage';
import { deleteCart } from '../../../api/cart';
import { handleAppError2 } from '../../../errors/errors';

const clearBasket = createAsyncThunk('clear-basket', (_, { dispatch }) => {
  const isLoggedIn = getToken() && true;
  if (isLoggedIn) {
    handleAppError2(dispatch)(() => deleteCart());
    // await deleteCart();
  }
  return [];
});

export default clearBasket;
