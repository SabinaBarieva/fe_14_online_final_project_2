import { AppError } from '../errors/errors';
import { loginEP } from './constants';
import fetchApi from './fetchApi';

const getToken = async (loginOrEmail, password) => {
  try {
    return await fetchApi(loginEP, {
      method: 'POST',
      body: JSON.stringify({ loginOrEmail, password }),
    });
  } catch (error) {
    if (error instanceof AppError) {
      const { password: passwordContextError, loginOrEmail: loginContext } =
        error.context;
      if (passwordContextError) {
        throw new AppError('Wrong password', { context: error });
      }
      if (loginContext)
        throw new AppError('Wrong Login or password', { context: error });
    }
    throw error;
  }
};
export default getToken;
