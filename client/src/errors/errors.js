import { setErrorMessage } from '../redux/slices/errorsSlice';

export const notFoundErrorMessage = 'Item Not Found';
export const productNotFoundErrorMessage = 'Product not found';
export const connectionErrorMessage = 'Connection Error';
export const notAuthorizedErrorMessage =
  'You are not authorized to get this page';
export const requestErrorMessage = 'Error in request';
export const serverErrorMessage = 'Error happened on server';
export const passwordErrorMessage = 'Wrong password';
export const loginOrPasswordErrorMessage = 'Wrong Login or password';
export class AppError extends Error {
  constructor(message, context = { rawError: undefined, context: {} }) {
    super(message);
    this.name = 'AppError';
    this.rawError = context.rawError;
    const rawErrorContext =
      (this.rawError && this.rawError.context) || undefined;
    this.context = { ...rawErrorContext, ...context.context };
    const rawErrorStack = (this.rawError && this.rawError.stack) || undefined;
    this.stack = rawErrorStack;
  }
}

// eslint-disable-next-line consistent-return
export const handleAppError2 = (dispatch) => async (fn) => {
  try {
    const result = await fn();
    return result;
  } catch (error) {
    // if (
    //   error instanceof AppError &&
    //   (error.message === passwordErrorMessage ||
    //     error.message === loginOrPasswordErrorMessage)
    // )
    //   throw error;
    if (error instanceof AppError) {
      dispatch(setErrorMessage({ error: error.message }));
    }
    throw error;
  }
};
// export const handleLoginError = (dispatch) => (error) => {
//   if (
//     (error instanceof AppError && error.message === passwordErrorMessage) ||
//     error.message === loginOrPasswordErrorMessage
//   )
//     throw error;
// };
export const handleAppError = (dispatch) => (error) => {
  if (
    error instanceof AppError &&
    (error.message === passwordErrorMessage ||
      error.message === loginOrPasswordErrorMessage)
  )
    throw error;
  else if (error instanceof AppError) {
    dispatch(setErrorMessage({ error: error.message }));
  } else throw error;
};
