import { productsFilterEP } from './constants';
import fetchApi from './fetchApi';

const getProducts = async ({ urlFilter, startPage = 1 }) => {
  let query;
  if (urlFilter === undefined || urlFilter === '') {
    query = `${productsFilterEP}?startPage=${startPage}&enabled=true`;
  } else
    query = `${productsFilterEP}?${urlFilter}&startPage=${startPage}&enabled=true`;

  return fetchApi(query);
};

export default getProducts;
