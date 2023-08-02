import {
  AppError,
  notFoundErrorMessage,
  productNotFoundErrorMessage,
} from '../errors/errors';
import { currentProductEP } from './constants';
import fetchApi from './fetchApi';

const getProduct = async (itemNo) => {
  try {
    const product = await fetchApi(currentProductEP(itemNo));
    return product;
  } catch (error) {
    if (
      error.context.status === 400 &&
      /Product with itemNo .* is not found/.test(error.context.message)
    ) {
      throw new AppError(productNotFoundErrorMessage, {
        context: { ...error.context.context },
      });
    }
    throw error;
  }
};
export default getProduct;
