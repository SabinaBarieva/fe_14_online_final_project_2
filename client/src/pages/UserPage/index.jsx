import React from 'react';
import { Grid } from '@mui/material';
import UserProfileInfo from '../../components/UserProfileInfo';
import OrdersList from '../../components/OrdersList';

function UserPage() {
  return (
    <Grid
      container
      sx={{
        maxWidth: '1440px',
        margin: '0 auto 20px',
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
