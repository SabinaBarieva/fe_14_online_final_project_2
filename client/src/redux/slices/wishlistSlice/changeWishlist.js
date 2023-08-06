import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../../../localstorage/localstorage';
import findProductInWishlist from './findProductInWishlist';
import { updateWishlist, deleteWishlist } from '../../../api/wishlist';
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
      let newWishlist = [];
      if (wishlist.length) {
        newWishlist = await updateWishlist(wishlist);
      } else {
        await deleteWishlist();
      }
      return newWishlist;
    }

    return wishlist;
  }
);

export const changeWishlistActionCreator = (product) => async (dispatch) => {
  try {
    await dispatch(
      changeWishlist({
        ...wishlistProductCreator({ product }),
      })
    );
  } catch (error) {
    console.error('Error while changing wishlist:', error);
  }
};

export default changeWishlist;
