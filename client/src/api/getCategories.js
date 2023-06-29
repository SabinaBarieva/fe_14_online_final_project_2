import { categoriesEP } from './constants';
import fetchApi from './fetchApi';

const getCategories = async () => fetchApi(categoriesEP());
export default getCategories;
