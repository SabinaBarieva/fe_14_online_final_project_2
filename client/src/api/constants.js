export const API_URL = '/api/';
export const productsEP = `${API_URL}products/`;
export const productsFilterEP = `${API_URL}products/filter/`;
export const categoriesEP = (id) => `${API_URL}catalog/${id || ''}`;
export const currentProductEP = (itemNo) => `${API_URL}products/${itemNo}`;
