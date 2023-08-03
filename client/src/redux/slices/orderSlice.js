import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postOrder from '../../api/postOrder';
import { getToken } from '../../localstorage/localstorage';
import extraReducerCreator from './extraReducerCreator';
import { handleAppError2 } from '../../errors/errors';

export const sendOrder = createAsyncThunk(
  'order/createOrder',
  async (customerInformation, { dispatch, getState }) => {
    const { user, basket } = getState();

    const isLoggedIn = getToken() && true;
    const orderInformation = {
      email: customerInformation.email,
      mobile: customerInformation.phone,
      letterSubject: customerInformation.name,
      letterHtml: customerInformation.bodyMail,
      deliveryAddress: customerInformation.addressObj,
    };
    const idKey = '_id';
    if (isLoggedIn) orderInformation.customerId = user.user[idKey];
    else orderInformation.products = basket.itemsBasket;
    return handleAppError2(dispatch)(() => postOrder(orderInformation));
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    error: null,
    isLoading: null,
  },
  extraReducers: (builder) => {
    extraReducerCreator(builder)(sendOrder, 'order');
  },
});

export const { saveOrder } = orderSlice.actions;

export default orderSlice.reducer;
