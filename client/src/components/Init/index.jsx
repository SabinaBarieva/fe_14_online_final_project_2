import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getToken } from '../../locastorage/localstorage';
import { fetchUserInfo } from '../../redux/slices/userSlice';
import { fetchOrders } from '../../redux/slices/ordersSlice';

function Init() {
  const dispatch = useDispatch();
  const token = getToken();
  useEffect(() => {
    if (token) {
      dispatch(fetchUserInfo());
      dispatch(fetchOrders());
    }
  }, []);
  return null;
}
export default Init;
