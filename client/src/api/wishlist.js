import { wishlistEP } from './constants';
import fetchApi from './fetchApi';

export const getWishlist = async () => {
  const wishlist = await fetchApi(wishlistEP());
  if (wishlist === null) return [];
  //   wishlist = await fetchApi(wishlistEP(), { method: 'POST' });
  return wishlist.products;
};

export const deleteFromWishlist = async (id) => {
  const wishlist = await fetchApi(wishlistEP(id), { method: 'DELETE' });
  return wishlist;
};

export const updateWishlist = async (remoteWishlist) => {
  const { products } = await fetchApi(wishlistEP(), {
    method: 'PUT',
    body: JSON.stringify({ products: remoteWishlist }),
  });
  return products;
};

export const deleteWishlist = () =>
  fetchApi(wishlistEP(), { method: 'DELETE' });
