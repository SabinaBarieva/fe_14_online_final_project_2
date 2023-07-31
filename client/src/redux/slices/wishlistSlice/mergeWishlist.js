import { createAsyncThunk } from '@reduxjs/toolkit';
import clone from '../../../helpers/clone';
import { getToken } from '../../../localstorage/localstorage';
import { getWishList, updateWishList } from '../../../api/wishlist';
import { isLoggedIn } from '../../selectors';
import isProductInWishlist from './isProductInWishlist';

const mergeWishlist = createAsyncThunk(
  'wishlist/merge',
  async (_, { getState }) => {
    const wishlist = clone(getState().wishlist.wishlist);
    let remoteWishList = [];
    if (isLoggedIn) {
      const { products: remoteWishlistProducts } = await getWishList();
      remoteWishList = remoteWishlistProducts;
    }
    wishlist.forEach((product) => {
      if (!isProductInWishlist(remoteWishList, product))
        remoteWishList.push(product);
    });
    const { products: resultWishList } = await updateWishList(remoteWishList);
    return resultWishList;
  }
);
export default mergeWishlist;
