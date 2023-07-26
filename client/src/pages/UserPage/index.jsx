import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Grid } from '@mui/material';
import { fetchUserInfo } from '../../redux/slices/userSlice';
import UserProfileInfo from '../../components/UserProfileInfo';
import OrdersList from '../../components/OrdersList';

function UserPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  return (
    <Grid
      container
      sx={{
        display: 'flex',
        justifyContent: 'space-evenly',
        marginBottom: '20px',
      }}>
      <Grid item xs={12} md={5}>
        <UserProfileInfo />
      </Grid>
      <Grid item xs={12} md={5}>
        <OrdersList />
      </Grid>
    </Grid>
  );
}
export default UserPage;
