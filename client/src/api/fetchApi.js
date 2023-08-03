import {
  AppError,
  connectionErrorMessage,
  notAuthorizedErrorMessage,
  requestErrorMessage,
  serverErrorMessage,
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
    switch (response.status) {
      case 200:
        return await response.json();
      case 400:
        throw new AppError(serverErrorMessage, {
          context: {
            ...(await response.json()),
            url,
            options,
            status: response.status,
          },
        });
      case 401:
        throw new AppError(notAuthorizedErrorMessage, {
          context: { url, options, status: response.status },
        });
      case 504:
        throw new AppError(connectionErrorMessage, {
          context: { url, options, status: response.status },
        });
      default:
      // throw new AppError(serverErrorMessage, {
      //   context: {
      //     url,
      //     options,
      //     status: response.status,
      //     response: response.json(),
      //   },
      // });
    }
    // if (response.ok && response.status === 200) {
    //   return await response.json();
    // }
    // if (response.status === 401)
    //   throw new AppError(notAuthorizedErrorMessage, {
    //     context: { url, options, status: response.status },
    //   });
    const result = await response.json();
    if (/^Error happened on server/.test(result))
      throw new AppError(serverErrorMessage, {
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
