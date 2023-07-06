import { productFiltersEP } from './constants';
import fetchApi from './fetchApi';

const getProductsFilters = () => fetchApi(productFiltersEP);

export default getProductsFilters;
