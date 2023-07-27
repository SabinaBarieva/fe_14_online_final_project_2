import { productsFilterEP } from './constants';
import fetchApi from './fetchApi';

const getProducts = async ({
  categories = [],
  startPage = 1,
  minPrice = null,
  maxPrice = null,
  sort,
}) => {
  // console.log(sort);
  const categoryQuery =
    categories.length > 0 ? `&categories=${categories.join(',')}` : '';
  let priceFilter = '';
  if (minPrice !== null) priceFilter += `&minPrice=${minPrice}`;
  if (maxPrice !== null) priceFilter += `&maxPrice=${maxPrice}`;
  const query = `${productsFilterEP}?${categoryQuery}&startPage=${startPage}${priceFilter}&sort=${sort}&enabled=true`;
  return fetchApi(query);
};

export default getProducts;

// Categories
// const categoryQuery =
//   categories.length > 0 ? `&categories=${categories.join(',')}` : '';
// console.log(categoryQuery);

// &categories=accessories&sort=-currentPrice

// /?categories=accessories&sort=-currentPrice
