import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postOrder from '../../api/postOrder';
import { getToken } from '../../localstorage/localstorage';
import clearBasket from './basketSlice/clearBasket';

export const sendOrder = createAsyncThunk(
  'order/createOrder',
  async (customerInformation, { dispatch, getState }) => {
    // const state = getState().order;
    const { user, basket } = getState();

    const isLoggedIn = getToken() && true;
    // const promises = cards.map((elem) =>
    //   dispatch(addProduct({ item: elem.product, quantity: elem.cartQuantity }))
    // );
    // await Promise.all(promises);
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

    await postOrder(orderInformation);
    await dispatch(clearBasket());
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    productsBasket: [],
    email: '',
    phone: '',
    name: '',
    bodyMail: '',
    adress: '',
    isFetching: false,
    isFetched: false,
  },
  reducers: {
    // addProduct: (state, action) => {
    //   const { item, quantity } = action.payload;
    //   state.productsBasket.push({
    //     // eslint-disable-next-line no-underscore-dangle
    //     _id: item._id,
    //     product: item,
    //     cartQuantity: quantity,
    //   });
    // },
    // saveOrder: (state, action) => {
    //   state.email = action.payload.emailAdress;
    //   state.phone = action.payload.phone;
    //   state.name = action.payload.name;
    //   state.bodyMail = action.payload.bodyMail;
    //   state.adress = action.payload.addressObj;
    // },
    // sendOrder: (state) => {
    //   postOrder({
    //     products: state.productsBasket,
    //     email: state.email,
    //     mobile: state.phone,
    //     letterSubject: state.name,
    //     letterHtml: state.bodyMail,
    //     deliveryAddress: state.adress,
    //   });
    //   state.productsBasket = '';
    //   state.email = '';
    //   state.phone = '';
    //   state.name = '';
    //   state.bodyMail = '';
    //   state.adress = '';
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(sendOrder.fulfilled, (state) => {
      state.productsBasket = '';
      state.email = '';
      state.phone = '';
      state.name = '';
      state.bodyMail = '';
      state.adress = '';
    });
  },
});

export const {
  //   startGetProduct,
  //   errorGetProduct,
  //   addProduct,
  saveOrder,
  //   sendOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
