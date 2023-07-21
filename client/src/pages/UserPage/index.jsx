import React from 'react';
import { Grid } from '@mui/material';
import UserProfileInfo from '../../components/UserProfileInfo';
import OrdersList from '../../components/OrdersList';

function UserPage() {
  return (
    <Grid
      container
      sx={{
        display: 'flex',
        justifyContent: 'space-evenly',
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
