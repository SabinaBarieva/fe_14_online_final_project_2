import { cartEP } from './constants';
import fetchApi from './fetchApi';

export const getCart = async () => {
  const cart = await fetchApi(cartEP());
  if (cart === null) return [];
  //   cart = await fetchApi(cartEP(), { method: 'POST' });
  return cart.products;
};

export const deleteFromCart = async (id) => {
  const cart = await fetchApi(cartEP(id), { method: 'DELETE' });
  return cart;
};

export const updateCart = async (remoteCart) => {
  const { products } = await fetchApi(cartEP(), {
    method: 'PUT',
    body: JSON.stringify({ products: remoteCart }),
  });
  return products;
};
