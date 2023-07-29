import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getOrders from '../../api/getOrders';
import extraReducerCreator, {
  initialStateCreator,
} from './extraReducerCreator';
import { setErrorMessage } from './errorsSlice';
import { login, logout } from './loginSlice';

const sliceName = 'orders';
const initialState = initialStateCreator(sliceName);
export const fetchOrders = createAsyncThunk(`${sliceName}/fetch`, () => {
  try {
    return getOrders();
  } catch (error) {
    setErrorMessage({ error: error.message });
    throw error;
  }
});

const ordersSlice = createSlice({
  name: sliceName,
  initialState,
  extraReducers: (builder) => {
    extraReducerCreator(builder)(fetchOrders, sliceName);
    builder.addCase(login.fulfilled, (_, action) => {
      action.asyncDispatch(fetchOrders());
    });
    builder.addCase(logout.fulfilled, () => initialState);
  },
});
export default ordersSlice.reducer;
