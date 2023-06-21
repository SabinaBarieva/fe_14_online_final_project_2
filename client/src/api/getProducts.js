import { productsFilterEP } from './constants';

const getProducts = async (categories = []) => {
  const categoryQuery = categories.length > 0 ? `&categories=${categories.join(',')}` : '';
  try {
    const response = await fetch(
      `${productsFilterEP}?${categoryQuery}&enabled=true`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error Fetching');
  }
};

export default getProducts;
