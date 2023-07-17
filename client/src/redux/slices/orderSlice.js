/* eslint-disable no-underscore-dangle */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getProduct from '../../api/getProduct';
import postOrder from '../../api/postOrder';

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
    startGetProduct: (state) => {
      state.isFetching = true;
    },
    finishGetProduct: (state) => {
      state.isFetching = false;
      state.isFetched = true;
    },
    errorGetProduct: (state) => {
      state.isFetching = false;
    },
    addProduct: (state, action) => {
      const { item, quantity } = action.payload;
      state.productsBasket.push({
        _id: item._id,
        product: item,
        cartQuantity: quantity,
      });
    },
    saveOrder: (state, action) => {
      console.log('hello from saveOrder');
      state.email = action.payload.emailAdress;
      state.phone = action.payload.phone;
      state.name = action.payload.name;
      state.bodyMail = action.payload.bodyMail;
      state.adress = action.payload.addressObj;
    },
    sendOrder: (state) => {
      console.log('hello from sendOrder');
      postOrder({
        products: state.productsBasket,
        email: state.email,
        mobile: state.phone,
        letterSubject: state.name,
        letterHtml: state.bodyMail,
        deliveryAddress: state.adress,
      });
      state.productsBasket = '';
      state.email = '';
      state.phone = '';
      state.name = '';
      state.bodyMail = '';
      state.adress = '';
    },
  },
});

export const {
  startGetProduct,
  errorGetProduct,
  addProduct,
  saveOrder,
  sendOrder,
} = orderSlice.actions;

export default orderSlice.reducer;

export const getProductsBasket = createAsyncThunk(
  'order/getProductsBasket',
  async ({ itemNo, quantity }, { dispatch }) => {
    dispatch(startGetProduct());
    console.log('hello from getProductsBasket');

    try {
      const resultArray = await getProduct(itemNo);
      return dispatch(addProduct({ item: resultArray, quantity }));
    } catch (error) {
      dispatch(
        errorGetProduct({
          error: error.message,
        })
      );
      throw error;
    }
  }
);

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (cards, { dispatch }) => {
    console.log('hello from createOrder');
    const promises = cards.map((elem) =>
      dispatch(getProductsBasket({ itemNo: elem.itemNo, quantity: elem.count }))
    );
    await Promise.all(promises);
  }
);
