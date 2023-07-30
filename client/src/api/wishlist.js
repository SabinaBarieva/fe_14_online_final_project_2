import { wishlistEP } from './constants';
import fetchApi from './fetchApi';

export const getWishList = () => fetchApi(wishlistEP());

export const addToWishList = (id) =>
  fetchApi(wishlistEP(id), { method: 'PUT' });

export const deleteFromWishList = (id) =>
  fetchApi(wishlistEP(id), { method: 'DELETE' });

export const updateWishList = (wishlist) =>
  fetchApi(wishlistEP(), { method: 'PUT', body: { products: wishlist } });
