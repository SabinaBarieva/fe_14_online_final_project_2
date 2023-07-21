import {
  AppError,
  connectionErrorMessage,
  notAuthorizedErrorMessage,
  requestErrorMessage,
} from '../errors/errors';

let userToken = null;
export const setToken = (token) => {
  userToken = token;
};
const fetchApi = async (url, options) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: userToken,
      },
      ...options,
    });
    if (response.ok && response.status === 200) {
      return await response.json();
    }
    const result = await response.json();
    if (result === 'Unauthorized')
      throw new AppError(notAuthorizedErrorMessage, {
        context: { url, options, status: 401 },
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
