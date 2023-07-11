import { searchEP } from './constants';
import fetchApi from './fetchApi';

const postSearch = async (searchQuery) => {
  if (!searchQuery) return [];
  return fetchApi(searchEP, {
    method: 'POST',
    body: JSON.stringify({ query: searchQuery }),
  });
};
export default postSearch;
