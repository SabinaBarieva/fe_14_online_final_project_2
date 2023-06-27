import { currentProductEP } from './constants';
import fetchApi from './fetchApi';

const getProduct = async (itemNo) => fetchApi(currentProductEP(itemNo));
export default getProduct;
