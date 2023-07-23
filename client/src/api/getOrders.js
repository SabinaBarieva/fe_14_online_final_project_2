import { ordersEP } from './constants';
import fetchApi from './fetchApi';

const getOrders = () => {
  fetchApi(ordersEP);
};
export default getOrders;
