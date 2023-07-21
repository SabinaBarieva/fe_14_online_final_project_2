import { createSlice } from '@reduxjs/toolkit';
import { setToken } from '../../api/fetchApi';
import { login, logout } from './loginSlice';

const initialState = { token: null };
const tokenSlice = createSlice({
  name: 'token',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      state.token = null;
      setToken(null);
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      const { token } = payload;
      state.token = token;
      setToken(token);
    });
  },
});
export default tokenSlice.reducer;
