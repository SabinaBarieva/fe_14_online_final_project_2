import { createAsyncThunk } from '@reduxjs/toolkit';
import clone from '../../../helpers/clone';
import { getToken } from '../../../localstorage/localstorage';
import { getWishList, updateWishList } from '../../../api/wishlist';

const mergeWishlist = createAsyncThunk(
  'wishlist/merge',
  async (_, { getState }) => {
    const wishlist = clone(getState.wishlist.wishlist);
    const { products: remoteWishlist } = await getWishList();
    const mergedWishlist = Array.from(
      new Set([...wishlist, ...remoteWishlist])
    );
    const { products: resultWishList } = updateWishList(mergedWishlist);
    return resultWishList;
  }
);
export default mergeWishlist;
