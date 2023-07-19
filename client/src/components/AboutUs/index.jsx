/* eslint-disable react/style-prop-object */
import React from 'react';
import Grid from '@mui/material/Grid';
import { AdvancedImage } from '@cloudinary/react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import getImg from '../../cloudinary';
import {
  Title,
  Phone,
  Telegram,
  Email,
  Links,
} from '../../themes/themeAboutUs';
import theme from '../../themes/theme';

function About() {
  return (
    <Grid
      container
      maxWidth={theme.breakpoints.values.xl}
      sx={{
        margin: '0 auto',
        backgroundColor: '#FCF9F6',
        borderRadius: '20px',
        marginBottom: '20px',
      }}>
      <Grid
        item
        xs={12}
        lg={5}
        sx={{
          padding: '0 20px',
          margin: '25px auto',
        }}>
        <AdvancedImage
          className="main-photo"
          width="100%"
          cldImg={getImg.image('404/uex3rly6ny9b4mouqvcc.png')}
          alt="our-photo"
        />
      </Grid>
      <Grid item md={12} lg={6} sx={{ margin: '20px' }}>
        <Title>About us</Title>
        <Typography
          sx={{ margin: '30px auto', fontSize: '1.3rem', textAlign: 'right' }}>
          Are you looking for Apple gadgets or accessories? You can buy it all
          right now and save tons of time! The Apple Shop is the online store
          will save you from the need to visit dozens of stores for searching of
          one or another product. With us, you can make purchases without
          letting go of a cup of tea or coffee, and our couriers will deliver
          your purchase on time to the address you specified. Our store is in
          the center of Kyiv and works online throughout Ukraine. Residents of
          Kyiv can visit us and purchase goods directly from the warehouse. We
          have several advantages, namely, the availability of many product
          names, the ability to provide the buyer with free consultation, the
          best prices. The Apple Shop team is looking forward to seeing you!
        </Typography>
        <Grid
          container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
            paddingRight: { xl: '35px' },
          }}>
          <Grid
            item
            xs={12}
            xl={5}
            sx={{
              displa: 'flex',
              flexDirection: 'column',
            }}>
            <Phone>
              Call us
              <Links href="tel:+380671112233"> +38 (067) 111-22-33</Links>
            </Phone>
            <Telegram>
              Text us <Links href="https://t.me/flschat">Telegram</Links>
            </Telegram>
            <Email>
              Mail to us
              <Links href="mailto:mail@example.com"> mail@example.com</Links>
            </Email>
          </Grid>
          <Grid item xs={12} lg={5}>
            <Box>
              <iframe
                title="bmlkdsmbvnsdijvbdijbv"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1526.0021470212216!2d30.521324267562047!3d50.45057572721975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce505f2c2b6f%3A0x3c708bc302925049!2z0KLQpiBHTE9CVVM!5e0!3m2!1suk!2sua!4v1689360541297!5m2!1suk!2sua"
                width="350"
                height="200"
                allowFullScreen="true"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default About;
