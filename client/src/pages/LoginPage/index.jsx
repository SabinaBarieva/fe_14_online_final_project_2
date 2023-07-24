import React from 'react';
import { Grid } from '@mui/material';
import Login from '../../components/Login';
import Registration from '../../components/Registration';

function LoginPage() {
  return (
    <Grid
      container
      sx={{
        display: 'flex',
        justifyContent: 'space-evenly',
        marginBottom: '20px',
      }}>
      <Grid item xs={12} md={5}>
        <p>Login</p>
      </Grid>
      <Grid
        container
        style={{ maxWidth: '400px', width: '100%' }}
        direction="column"
        justifyContent="center"
        alignItems="center">
        <Login />
        <span style={{ color: 'black', margin: 10 }}> OR </span>
        <Registration />
      </Grid>
    </Grid>
  );
}
export default LoginPage;
