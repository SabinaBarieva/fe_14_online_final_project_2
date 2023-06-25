import { productsFilterEP } from './constants';
import fetchApi from './fetchApi';

const getProducts = async ({
  categories = [],
  startPage = 1,
  perPage = 10,
}) => {
  const categoryQuery = categories.length > 0 ? `&categories=${categories.join(',')}` : '';
  const query = `${productsFilterEP}?${categoryQuery}&startPage=${startPage}&perPage=${perPage}&enabled=true`;
  return fetchApi(query);
};

export default getProducts;
