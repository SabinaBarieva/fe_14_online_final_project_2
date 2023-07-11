export const API_URL = '/api/';
export const productsEP = `${API_URL}products/`;
export const productsFilterEP = `${API_URL}products/filter/`;
export const categoriesEP = (id) => `${API_URL}catalog/${id || ''}`;
export const currentProductEP = (itemNo) => `${API_URL}products/${itemNo}`;
export const productFiltersEP = `${API_URL}product-filters`;
export const orderEP = `${API_URL}orders`;
export const searchEP = `${API_URL}products/search`;
