import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Grid } from '@mui/material';
import { fetchUserInfo } from '../../redux/slices/userSlice';
import UserProfileInfo from '../../components/UserProfileInfo';
import OrdersList from '../../components/OrdersList';

function UserPage() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchUserInfo());
  // }, [dispatch]);

  return (
    <Grid
      container
      sx={{
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-evenly',
      }}>
      <Grid item xs={11} md={5}>
        <UserProfileInfo />
      </Grid>
      <Grid item xs={11} md={5}>
        <OrdersList />
      </Grid>
    </Grid>
  );
}
export default UserPage;
