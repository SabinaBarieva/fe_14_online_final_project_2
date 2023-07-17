import * as React from 'react';
import { Link } from 'react-router-dom';
import { AdvancedImage } from '@cloudinary/react';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import errorEmpty from '../../cloudinary';

function BasketEmpty() {
  const empty = errorEmpty.image('404/nwmbxz7zfhxn1t1rd0sg.png');

  return (
    <Grid container sx={{ width: '85%', margin: '20px auto' }}>
      <Grid
        item
        md={12}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}>
        <AdvancedImage cldImg={empty} alt="empty" />
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
        <Link to="/">
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

export default BasketEmpty;
