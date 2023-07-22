import { userInfoEP } from './constants';
import fetchApi from './fetchApi';

const getUserInformation = () => fetchApi(userInfoEP);

export default getUserInformation;
