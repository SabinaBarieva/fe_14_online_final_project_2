import { AppError } from '../errors/errors';
import { orderEP } from './constants';
import fetchApi from './fetchApi';

const postOrder = async ({
  products,
  email,
  mobile,
  letterSubject,
  letterHtml,
  deliveryAddress,
  customerId,
  ...rest
}) => {
  const response = await fetchApi(orderEP, {
    method: 'POST',
    body: JSON.stringify({
      products,
      email,
      mobile,
      letterSubject,
      letterHtml,
      deliveryAddress,
      customerId,
      ...rest,
    }),
  });
  if (response.message) {
    throw new AppError(response.message, { context: response });
  }
  return response;
};
export default postOrder;
