import useLocalStorage from './useLocalStorage';

const useToken = () => {
  const [token] = useLocalStorage('token', null);
  return token;
};
export default useToken;
