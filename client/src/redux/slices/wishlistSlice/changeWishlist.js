import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../../../localstorage/localstorage';
import findProductInWishlist from './findProductInWishlist';
import { updateWishlist } from '../../../api/wishlist';
import wishlistProductCreator from './wishlistProductCreator';

const changeWishlist = createAsyncThunk(
  'wishlist/change',
  async ({ product }, { getState, rejectWithValue }) => {
    const idKey = '_id';
    const isLoggedIn = getToken() && true;
    let wishlist = JSON.parse(
      JSON.stringify(getState().wishlist.itemsWishlist)
    );
    const updatedWishlist = [];
    const currentProductInWishlist = findProductInWishlist(product, wishlist);
    if (currentProductInWishlist) {
      wishlist = wishlist.filter(({ itemNo }) => itemNo !== product.itemNo);
    } else {
      wishlist.push(product);
    }

    if (isLoggedIn) {
      const newWishlist = await updateWishlist(wishlist);
      // console.log(newWishlist);
      return newWishlist;
    }

    if (isLoggedIn) {
      const { products: remoteWishlist } = await updateWishlist(wishlist);
      return remoteWishlist;
    }
    return wishlist;
  }
);

export const changeWishlistActionCreator = (product) =>
  changeWishlist({
    ...wishlistProductCreator({ product }),
  });

export default changeWishlist;
