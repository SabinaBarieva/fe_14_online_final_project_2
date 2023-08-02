import { createSlice } from '@reduxjs/toolkit';
import extraReducerCreator, {
  initialStateCreator,
} from '../extraReducerCreator';
import { login } from '../loginSlice';
import mergeWishlist from './mergeWishlist';
import toggleProductInWishlist from './toggleProductInWishlist';

const initialState = {
  itemsWishlist: [],
};
const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      action.asyncDispatch(mergeWishlist());
    });
    builder.addCase(mergeWishlist.fulfilled, (state, { payload: wishlist }) => {
      state.itemsWishlist = wishlist;
    });
    // extraReducerCreator(builder)(toggleProductInWishlist, sliceName);
  },
});

export default wishlistSlice.reducer;
