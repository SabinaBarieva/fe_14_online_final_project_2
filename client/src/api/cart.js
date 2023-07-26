import { cartEP } from './constants';
import fetchApi from './fetchApi';

export const getCart = async () => {
  const cart = await fetchApi(cartEP());
  if (cart === null) return [];
  return cart.products;
};

export const deleteFromCart = (id) => fetchApi(cartEP(), { method: 'DELETE' });

export const updateCart = async (cart) => {
  const { products } = await fetchApi(cartEP(), {
    method: 'PUT',
    body: JSON.stringify(cart),
  });
  return products;
};
