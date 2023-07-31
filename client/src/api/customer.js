import { AppError } from '../errors/errors';
import { customerEP, loginEP, userInfoEP } from './constants';
import fetchApi from './fetchApi';

const dataValidityError = (error) => {
  const { status } = error.context;
  if (status === 400) {
    throw new AppError('Check Your data', { context: error.context });
  }
};
export const addCustomer = async ({
  firstName,
  lastName,
  login,
  email,
  password,
  telephone,
  ...rest
}) => {
  try {
    const result = await fetchApi(customerEP, {
      method: 'POST',
      body: JSON.stringify({
        firstName,
        lastName,
        login,
        email,
        password,
        telephone,
        ...rest,
      }),
    });
    return result;
  } catch (error) {
    dataValidityError(error);
    throw error;
  }
};

export const updateCustomer = ({
  firstName,
  lastName,
  login,
  email,
  password,
  telephone,
  ...rest
}) =>
  fetchApi(customerEP, {
    method: 'PUT',
    body: JSON.stringify({
      firstName,
      lastName,
      login,
      email,
      password,
      telephone,
      ...rest,
    }),
  });

export const updateCustomerPasssword = (password, newPassword) => {
  fetchApi(customerEP, {
    method: 'PUT',
    body: { password, newPassword },
  });
};

export const getToken = async (loginOrEmail, password) => {
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

export const getUserInformation = () => fetchApi(userInfoEP);
