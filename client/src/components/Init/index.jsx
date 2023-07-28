import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getToken } from '../../localstorage/localstorage';
import { fetchUserInfo } from '../../redux/slices/userSlice';
import { fetchOrders } from '../../redux/slices/ordersSlice';
import mergeBasket from '../../redux/slices/basketSlice/mergeBasket';

function Init() {
  const dispatch = useDispatch();
  const token = getToken();
  useEffect(() => {
    if (token) {
      dispatch(fetchUserInfo());
      dispatch(fetchOrders());
      dispatch(mergeBasket());
    }
  }, []);
  return null;
}
export default Init;
