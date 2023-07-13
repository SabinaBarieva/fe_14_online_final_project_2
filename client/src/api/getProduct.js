import { currentProductEP, productsEP } from './constants';
import fetchApi from './fetchApi';

const getProduct = async (itemNo) => fetchApi(currentProductEP(itemNo));
export const getProducts = async () => fetchApi(productsEP());

export default getProduct;
