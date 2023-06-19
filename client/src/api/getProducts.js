import { productsFilterEP } from './constants';

const getProducts = async (categories = [], startPage = 1, perPage = 10) => {
  const categoryQuery =
    categories.length > 0 ? `&categories=${categories.join(',')}` : '';
  try {
    const response = await fetch(
      `${productsFilterEP}?${categoryQuery}&startPage=${startPage}&perPage=${perPage}&enabled=true`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error Fetching');
  }
};

export default getProducts;
