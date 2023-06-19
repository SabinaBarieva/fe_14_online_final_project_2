import { categoriesEP } from './constants';

const getCategories = async (id = undefined) => {
  try {
    const categorieIdQuery = id ? `${id}` : '';
    const response = await fetch(`${categoriesEP}${categorieIdQuery}`);
    const result = response.json();
    return result;
  } catch (error) {
    throw new Error('Fetch Error');
  }
};
export default getCategories;
