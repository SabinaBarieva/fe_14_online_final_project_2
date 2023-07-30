import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../../../localstorage/localstorage';
import { updateWishList } from '../../../api/wishlist';

const toggleProductInWishlist = createAsyncThunk(
  'wishlost/toggle-product',
  async ({ productId }, { getState }) => {
    const isLoggedIn = getToken() && true;
    let { wishlist } = JSON.parce(JSON.stringify(getState().wishlist));
    const isProductInWishList = wishlist.includes(productId);
    wishlist = isProductInWishList
      ? wishlist.filter((wishlistProductId) => wishlistProductId !== productId)
      : wishlist.push(productId);
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
