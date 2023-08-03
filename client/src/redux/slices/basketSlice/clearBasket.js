import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../../../localstorage/localstorage';
import { deleteCart } from '../../../api/cart';
import { handleAppError2 } from '../../../errors/errors';

const clearBasket = createAsyncThunk(
  'clear-basket',
  async (_, { dispatch }) => {
    const isLoggedIn = getToken() && true;
    if (isLoggedIn) {
      await handleAppError2(dispatch)(() => deleteCart());
    }
    return [];
  }
);

export default clearBasket;
