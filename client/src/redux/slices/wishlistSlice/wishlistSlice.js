import { createSlice } from '@reduxjs/toolkit';
import extraReducerCreator, {
  initialStateCreator,
} from '../extraReducerCreator';
import { login, logout } from '../loginSlice';
import mergeWishlist from './mergeWishlist';
import toggleProductInWishlist from './toggleProductInWishlist';

const sliceName = 'wishlist';
const initialState = initialStateCreator(sliceName, []);
const wishlistSlice = createSlice({
  name: sliceName,
  initialState,
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.wishlist = action.asyncDispatch(mergeWishlist());
    });
    builder.addCase(logout.fulfilled, () => initialState);
    extraReducerCreator(builder)(mergeWishlist, sliceName);
    extraReducerCreator(builder)(toggleProductInWishlist, sliceName);
  },
});

export default wishlistSlice.reducer;
