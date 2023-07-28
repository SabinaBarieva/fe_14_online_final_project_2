import { createSlice } from '@reduxjs/toolkit';

const isLocalStorageEnabled = () => {
  try {
    const key = `__storage__test`;
    window.localStorage.setItem(key, null);
    window.localStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

const initialState = {
  itemsWishlist: [],
};
const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    getWishlist: (state) => {
      let wishlist = [];
      if (isLocalStorageEnabled() && Object.hasOwn(localStorage, 'wishlist')) {
        wishlist = localStorage.getItem('wishlist');
      }
      state.wishlist = JSON.parse(wishlist);
    },
    handleWishlist: (state, { payload: wishlist }) => {
      console.log('wish', wishlist);
      if (isLocalStorageEnabled()) {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
      }
      state.wishlist = wishlist;
    },
  },
});
export const { handleWishlist, getWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
