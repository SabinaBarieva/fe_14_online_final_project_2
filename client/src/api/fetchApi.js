import {
  AppError,
  connectionErrorMessage,
  notAuthorizedErrorMessage,
  requestErrorMessage,
} from '../errors/errors';
import { getToken } from '../localstorage/localstorage';

const fetchApi = async (url, options) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken(),
      },
      ...options,
    });
    if (response.ok && response.status === 200) {
      return await response.json();
    }
    if (response.status === 401)
      throw new AppError(notAuthorizedErrorMessage, {
        context: { url, options, status: response.status },
      });
    const result = await response.json();
    if (/^Error happened on server/.test(result))
      throw new AppError('Error happened on server', {
        context: { ...result, url, options, status: response.status },
      });
    throw new AppError(requestErrorMessage, {
      context: { ...result, url, options, status: response.status },
    });
  } catch (error) {
    if (!(error instanceof AppError)) {
      throw new AppError(connectionErrorMessage, { rawError: error });
    } else throw error;
  }
};
export default fetchApi;
