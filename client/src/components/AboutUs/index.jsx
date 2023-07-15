/* eslint-disable react/style-prop-object */
import React from 'react';
import Grid from '@mui/material/Grid';
import { AdvancedImage } from '@cloudinary/react';
import getImg from '../../cloudinary';

function About() {
  return (
    <Grid container sx={{ width: '91%', margin: '25px auto' }}>
      <Grid
        item
        xs={12}
        md={5}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <AdvancedImage
          className="main-photo"
          width="100%"
          cldImg={getImg.image('404/uex3rly6ny9b4mouqvcc.png')}
          alt="our-photo"
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={7}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          width: '90%',
        }}
      />
      <iframe
        title="bmlkdsmbvnsdijvbdijbv"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1526.0021470212216!2d30.521324267562047!3d50.45057572721975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce505f2c2b6f%3A0x3c708bc302925049!2z0KLQpiBHTE9CVVM!5e0!3m2!1suk!2sua!4v1689360541297!5m2!1suk!2sua"
        width="500"
        height="350"
        allowfullscreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade">
        аа
      </iframe>
    </Grid>
  );
}

export default About;
