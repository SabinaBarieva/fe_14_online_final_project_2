import { productsFilterEP } from './constants';
import fetchApi from './fetchApi';

const getProducts = async ({
  categories = [],
  startPage = 1,
  perPage = 10,
  minPrice = null,
  maxPrice = null,
  sort = 'currentPrice',
}) => {
  const categoryQuery =
    categories.length > 0 ? `&categories=${categories.join(',')}` : '';
  let priceFilter = '';
  if (minPrice !== null) priceFilter += `&minPrice=${minPrice}`;
  if (maxPrice !== null) priceFilter += `&maxPrice=${maxPrice}`;
  const query = `${productsFilterEP}?${categoryQuery}&startPage=${startPage}&perPage=${perPage}${priceFilter}&sort=${sort}&enabled=true`;
  return fetchApi(query);
};

export default getProducts;
