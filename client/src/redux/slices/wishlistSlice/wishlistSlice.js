import { createSlice } from '@reduxjs/toolkit';
import { login, logout } from '../loginSlice';
import mergeWishlist from './mergeWishlist';
import changeWishlist from './changeWishlist';

const initialState = {
  itemsWishlist: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      action.asyncDispatch(mergeWishlist());
    });

    builder.addCase(mergeWishlist.fulfilled, (state, { payload: wishlist }) => {
      state.itemsWishlist = wishlist;
    });

    builder.addCase(
      changeWishlist.fulfilled,
      (state, { payload: wishlist }) => {
        state.itemsWishlist = wishlist;
      }
    );

    builder.addCase(logout.fulfilled, () => initialState);
  },
});

export default wishlistSlice.reducer;
