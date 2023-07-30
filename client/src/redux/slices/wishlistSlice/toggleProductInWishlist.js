import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../../../localstorage/localstorage';
import { updateWishList } from '../../../api/wishlist';
import clone from '../../../helpers/clone';

const toggleProductInWishlist = createAsyncThunk(
  'wishlost/toggle-product',
  async ({ productId }, { getState }) => {
    console.log(productId);
    const isLoggedIn = getToken() && true;
    const a = getState().wishlist;
    let { wishlist } = clone(a);
    const isProductInWishList = wishlist.includes(productId);
    if (isProductInWishList)
      wishlist = wishlist.filter(
        (wishlistProductId) => wishlistProductId !== productId
      );
    else wishlist.push(productId);
    if (isLoggedIn) {
      const { product: remoteWishList } = await updateWishList(wishlist);
      return remoteWishList;
    }
    return wishlist;
  }
);
export const toggleProductInWishlistActionCreator = ({ productId }) =>
  toggleProductInWishlist({ productId });
export default toggleProductInWishlist;
