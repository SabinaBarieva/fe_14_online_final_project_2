import * as React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';

function PageNotFound() {
  const Code = styled('div')({
    textAlign: 'right',
    letterSpacing: '0.015em',
    color: '#9A9292',
  });
  return (
    <Grid container sx={{ width: '85%', margin: '0 auto' }}>
      Oops, the third party is not clear You have entered a wrong address, or
      else such a side on the site is no longer available.
      <Link to="/home">back to the home page</Link>
    </Grid>
  );
}

export default PageNotFound;
