import { createSlice } from '@reduxjs/toolkit';
import getProducts from '../../api/getProducts';
import { setErrorMessage } from './errorsSlice';

const initialState = {
  products: [{
    enabled: true,
    name: 'iPhone 11',
    currentPrice: 462,
    categories: 'cellphone',
    imageUrls: 'https://maclove.ua/wpics/full/pic77552_1.jpg',
    quantity: 8,
    color: 'Black',
    brand: 'Apple',
    storage: '64gb',
    code: 77552,
    guarantee: '3 months',
    date: '2019-10-14T12:46:29.042Z'
  },
  {
    enabled: true,
    name: 'iPhone 13',
    currentPrice: 717,
    categories: 'cellphone',
    imageUrls: 'https://maclove.ua/wpics/full/pic80465_1.jpg',
    quantity: 10,
    color: 'Blue',
    brand: 'Apple',
    storage: '128gb',
    code: 80465,
    guarantee: '3 months',
    date: '2019-10-14T12:46:30.042Z'
  },
  {
    enabled: true,
    name: 'iPhone 14',
    currentPrice: 820,
    categories: 'cellphone',
    imageUrls: 'https://maclove.ua/wpics/full/pic82938_1.jpg',
    quantity: 12,
    color: 'Yellow',
    brand: 'Apple',
    storage: '128gb',
    code: 83091,
    guarantee: '3 months',
    date: '2019-10-14T12:46:31.042Z'
  },
  {
    enabled: true,
    name: 'iPhone 14 Plus',
    currentPrice: 892,
    categories: 'cellphone',
    imageUrls: 'https://maclove.ua/wpics/full/pic81830_1.jpeg',
    quantity: 7,
    color: 'Starlight',
    brand: 'Apple',
    storage: '128gb',
    code: 81830,
    guarantee: '3 months',
    date: '2019-10-14T12:46:23.042Z'
  },
  {
    enabled: true,
    name: 'iPhone 14 Pro',
    currentPrice: 1185,
    categories: 'cellphone',
    imageUrls: 'https://maclove.ua/wpics/full/pic82120_2.jpg',
    quantity: 13,
    color: 'Gold',
    brand: 'Apple',
    storage: '256gb',
    code: 82120,
    guarantee: '3 months',
    date: '2019-10-14T12:46:33.042Z'
  },
  {
    enabled: true,
    name: 'iPhone 14 Pro Max',
    currentPrice: 1441,
    categories: 'cellphone',
    imageUrls: 'https://maclove.ua/wpics/full/pic82142_2.jpg',
    quantity: 17,
    color: 'Space Black',
    brand: 'Apple',
    storage: '512gb',
    code: 82142,
    guarantee: '3 months',
    date: '2019-10-14T12:46:34.042Z'
  },
  {
    enabled: true,
    name: 'iPhone 13 mini',
    currentPrice: 915,
    categories: 'cellphone',
    imageUrls: 'https://maclove.ua/wpics/full/pic80478_1.jpg',
    quantity: 3,
    color: 'Pink',
    brand: 'Apple',
    storage: '512gb',
    code: 80478,
    guarantee: '3 months',
    date: '2019-10-14T12:46:35.042Z'
  },
  {
    enabled: true,
    name: 'iPhone SE 2020',
    currentPrice: 425,
    categories: 'cellphone',
    imageUrls: 'https://maclove.ua/wpics/full/pic78409_1.jpg',
    quantity: 5,
    color: 'Balck',
    brand: 'Apple',
    storage: '64gb',
    code: 78409,
    guarantee: '3 months',
    date: '2019-10-14T12:46:36.042Z'
  },
  {
    enabled: true,
    name: 'iPhone SE 2022',
    currentPrice: 525,
    categories: 'cellphone',
    imageUrls: 'https://maclove.ua/wpics/full/pic81119_1.jpg',
    quantity: 9,
    color: 'Midnight',
    brand: 'Apple',
    storage: '128gb',
    code: 81119,
    guarantee: '3 months',
    date: '2019-10-14T12:46:37.042Z'
  },
  {
    enabled: true,
    name: 'iPhone XR',
    currentPrice: 403,
    categories: 'cellphone',
    imageUrls: 'https://estore.ua/media/catalog/product/cache/8/image/650x650/9df78eab33525d08d6e5fb8d27136e95/c/o/compare_iphonexr_black_large_2x_2_4.jpg',
    quantity: 3,
    color: 'Black',
    brand: 'Apple',
    storage: '64gb',
    code: 224237,
    guarantee: '3 months',
    date: '2019-10-14T12:46:38.042Z'
  },
  {
    enabled: true,
    name: 'iPad 10.9 (2022)',
    currentPrice: 480,
    categories: 'tablet',
    imageUrls: 'https://maclove.ua/wpics/full/pic82159_1.jpg',
    quantity: 3,
    color: 'Blue',
    brand: 'Apple',
    storage: '64gb',
    code: 82159,
    guarantee: '3 months',
    date: '2019-10-14T12:46:39.042Z'
  },
  {
    enabled: true,
    name: 'iPad 10.2 (2021)',
    currentPrice: 330,
    categories: 'tablet',
    imageUrls: 'https://maclove.ua/wpics/full/pic80581_1.jpg',
    quantity: 1,
    color: 'Space Gray',
    brand: 'Apple',
    storage: '64gb',
    code: 22437,
    guarantee: '3 months',
    date: '2019-10-14T12:46:40.042Z'
  }],
  total: undefined,
  isFetching: false,
  isFetched: false,
};
// const getProducts = createAsyncThunk();
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    startFetchingProducts: (state) => {
      state.isFetching = true;
    },
    finishFetchingProducts: (state, action) => {
      state.isFetching = false;
      state.isFetched = true;
      state.products = action.payload.products;
      state.total = action.payload.total;
    },
    errorFetchingProducts: (state, action) => {
      state.isFetching = false;
    },
  },
});
console.log(productsSlice);
export const {
  startFetchingProducts,
  finishFetchingProducts,
  errorFetchingProducts,
} = productsSlice.actions;
export default productsSlice.reducer;
export const fetchProducts =
  ({ categories = [], perPage = 10, startPage = 1 }) =>
  async (dispatch) => {
    dispatch(startFetchingProducts());
    try {
      const result = await getProducts({
        categories,
        startPage,
        perPage,
      });
      dispatch(
        finishFetchingProducts({
          products: result.products,
          total: result.productsQuantity,
        })
      );
    } catch (e) {
      dispatch(
        errorFetchingProducts({
          error: e.message,
        })
      );
      dispatch(
        setErrorMessage({
          error: e.message,
        })
      );
    }
  };
