import { currentProductEP } from './constants';

const getProduct = async (itemNo) => {
  try {
    const response = await fetch(currentProductEP(itemNo));
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error('Fetch Error');
  }
};
export default getProduct;
