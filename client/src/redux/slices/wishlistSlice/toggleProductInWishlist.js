import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../../../localstorage/localstorage';
import { updateWishList } from '../../../api/wishlist';
import isProductInWishlist from './isProductInWishlist';

const toggleProductInWishlist = createAsyncThunk(
  'wishlost/toggle-product',
  async ({ product }, { getState }) => {
    const idKey = '_id';
    const isLoggedIn = getToken() && true;
    let { wishlist } = JSON.parse(JSON.stringify(getState().wishlist));
    if (isProductInWishlist(wishlist, product))
      wishlist = wishlist.filter(
        ({ _id: productId }) => productId !== product[idKey]
      );
    else wishlist.push(product);
    if (isLoggedIn) {
      const { products: remoteWishList } = await updateWishList(wishlist);
      return remoteWishList;
    }
    return wishlist;
  }
);
export const toggleProductInWishlistActionCreator = (product) =>
  toggleProductInWishlist({ product });
export default toggleProductInWishlist;
