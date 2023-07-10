import { orderEP } from './constants';
import fetchApi from './fetchApi';

/**
 *
 * Posts Order Information To DataBase
 *
 * @param {Object[]} products - Array with full information about products and quantity
 *
 * Example:
 *
 * [
 *
 *      { product: {...product1Object }, cartQuantity: product1Quantity },
 *
 *      { product:{ ...product2Object }, cartQuantity: product2Quantity }
 *
 * ]
 *
 * @param {string} email - email of customer, it is used to send email about order
 * @param {string} mobile - phone number of customer
 * @param {string} letterSubject - subject of email to customer
 * @param {string} letterHtml - body of email, it is possible to format with HTML
 * @param {Object} deliveryAddress - Information about delivery adress
 * @param {Object} [shipping] - Information about shipping (optional)
 *
 * @returns {Object} Object with order information or AppError with message
 */
export const postOrder = ({
  products,
  email,
  mobile,
  letterSubject,
  letterHtml,
  deliveryAddress,
  shipping = {},
}) => {
  fetchApi(orderEP, {
    method: 'POST',
    body: JSON.stringify({
      products,
      email,
      mobile,
      letterSubject,
      letterHtml,
      deliveryAddress,
      shipping,
    }),
  });
};
fetchApi;
orderEP;
