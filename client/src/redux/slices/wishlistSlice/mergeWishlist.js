import { createAsyncThunk } from '@reduxjs/toolkit';
import { getWishlist, updateWishlist } from '../../../api/wishlist';
import { getToken } from '../../../localstorage/localstorage';

const mergeWishlist = createAsyncThunk(
  'wishlist/merge',
  async (_, { getState }) => {
    const isLoggedIn = getToken() && true;
    try {
      const localWishlist = getState().wishlist.itemsWishlist;

      const remoteWishlist = isLoggedIn ? await getWishlist() : [];
      localWishlist.forEach((product) => {
        const foundedProduct = remoteWishlist.find(
          ({ itemNo }) => itemNo === product.itemNo
        );
        if (foundedProduct) {
          remoteWishlist.filter(
            ({ itemNo }) => itemNo !== foundedProduct.itemNo
          );
        } else {
          remoteWishlist.push(product);
        }
      });
      await updateWishlist(remoteWishlist);
      const wishlist = await getWishlist();
      return wishlist;
    } catch (error) {
      console.log(`Error ${error}`);
      throw error;
    }
  }
);
export default mergeWishlist;
