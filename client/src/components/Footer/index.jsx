import React from 'react';
import {
  Grid,
  Link,
  Stack,
  Typography,
  TableFooter,
  CssBaseline,
} from '@mui/material';
import { AdvancedImage } from '@cloudinary/react';
import getImg from '../../cloudinary';

const style = {
  background: '#484543',
  display: 'block',
  padding: '4.036% 5.14% 5.8% 5.35%',
  marginTop: 'auto',
};

function Footer() {
  return (
    <>
      <CssBaseline />
      <TableFooter component="footer" style={style}>
        <Grid
          container
          spacing={1}
          direction={{ xs: 'column', lg: 'row' }}
          justifyContent={{ xs: 'center', lg: 'space-between' }}
          alignItems="center">
          <Grid
            item
            className="footer_text"
            textAlign={{ xs: 'center', lg: 'start' }}>
            <Typography
              variant="h5"
              gutterBottom
              style={{ color: '#FFFFFF', fontWeight: '700' }}>
              Apple Shop
            </Typography>
            <Typography
              variant="subtitle1"
              component="p"
              color="textSecondary"
              style={{ color: '#FFFFFF' }}
              gutterBottom>
              © Copyright 2023. Created by OurTeam
            </Typography>
          </Grid>

          <Grid item className="footer_links" aria-label="figma button group">
            <Stack direction="row" spacing={2}>
              <Link
                href="https://uk-ua.facebook.com/"
                underline="none"
                target="_blank">
                {/* <Img
                  src="../../img/facebook.png"
                  alt="facebook"
                  className="link-img link-img__facebook"
                /> */}
                <AdvancedImage
                  cldImg={getImg.image('footer/ktcnkvsswuh8c89e2rjb.png')}
                  alt="facebook"
                />
              </Link>
              <Link
                href="https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2F"
                underline="none"
                target="_blank">
                <AdvancedImage
                  cldImg={getImg.image('footer/mniuaxo36cyqgybjg40f.png')}
                  alt="instagram"
                />
              </Link>
              <Link
                href="https://twitter.com/?lang=uk"
                underline="none"
                target="_blank">
                <AdvancedImage
                  cldImg={getImg.image('footer/j6a0n80trcx5p4ztqyqm.png')}
                  alt="twitter"
                />
              </Link>
              <Link
                href="https://www.youtube.com/"
                underline="none"
                target="_blank">
                <AdvancedImage
                  cldImg={getImg.image('footer/ihssemitolz25bykodi4.png')}
                  alt="youtube"
                />
              </Link>
            </Stack>
          </Grid>
        </Grid>
      </TableFooter>
    </>
  );
}

export default Footer;
