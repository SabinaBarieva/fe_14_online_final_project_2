import {
  AppError,
  connectionErrorMessage,
  notFoundErrorMessage,
} from '../errors/errors';

const fetchApi = async (url, options) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });
    if (response.ok && response.status === 200) {
      return await response.json();
    }

    throw new AppError(notFoundErrorMessage, {
      context: await response.json(),
    });
  } catch (error) {
    if (!(error instanceof AppError)) {
      throw new AppError(connectionErrorMessage, { rawError: error });
    } else throw error;
  }
};
export default fetchApi;
