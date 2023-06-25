import * as React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';

function PageNotFound() {
  const Text = styled('div')({
    textAlign: 'center',
    color: '#9A9292',
  });
  return (
    <Grid container sx={{ width: '85%', margin: '0 auto' }}>
      <Grid item md={12}>
        <Text>
          Oops, the third party is not clear...
          <br />
          You have entered a wrong address, or this page on the site is no
          longer available.
        </Text>
      </Grid>
      <Grid
        item
        md={12}
        xs={12}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Link to="/home">
          <Button
            variant="contained"
            sx={{
              marginTop: {
                xs: '10px',
                md: '0',
              },
              padding: '9px 18px',
              backgroundColor: '#211F1C',
              color: '#FFF',
              borderRadius: 0,
              border: '1px solid #211F1C',
              '&:hover': {
                backgroundColor: '#FFF',
                color: '#211F1C',
                border: '1px solid #211F1C',
              },
            }}>
            back to the home page
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}

export default PageNotFound;
