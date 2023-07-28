import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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
    addProduct: (state, action) => {
      const { item, quantity } = action.payload;
      state.productsBasket.push({
        // eslint-disable-next-line no-underscore-dangle
        _id: item._id,
        product: item,
        cartQuantity: quantity,
      });
    },
    saveOrder: (state, action) => {
      state.email = action.payload.emailAdress;
      state.phone = action.payload.phone;
      state.name = action.payload.name;
      state.bodyMail = action.payload.bodyMail;
      state.adress = action.payload.addressObj;
    },
    sendOrder: (state) => {
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

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (cards, { dispatch }) => {
    const promises = cards.map((elem) =>
      dispatch(addProduct({ item: elem.product, quantity: elem.cartQuantity }))
    );
    await Promise.all(promises);
  }
);
