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

function Footer() {
  return (
    <>
      <CssBaseline />
      <TableFooter
        component="footer"
        sx={{
          background: '#484543',
          padding: {
            xs: '1.13rem 3.62rem 1.5rem',
            md: '1.12rem 16.36rem 1.5rem',
            lg: '3.63rem 4.36rem 5.24rem 4.81rem',
          },
          marginTop: 'auto',
        }}>
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
              sx={{
                color: '#FFFFFF',
                fontFamily: 'Roboto',
                fontStyle: 'normal',
                fontWeight: '700',
                lineHeight: 'normal',
                fontSize: {
                  xs: '14px',
                  lg: '30px',
                },
              }}>
              Apple Shop
            </Typography>
            <Typography
              variant="subtitle1"
              component="p"
              color="textSecondary"
              sx={{
                color: '#FFFFFF',
                fontFamily: 'Roboto',
                fontStyle: 'normal',
                fontWeight: '400',
                lineHeight: 'normal',
                fontSize: {
                  xs: '14px',
                  lg: '18px',
                },
              }}
              gutterBottom>
              © Copyright 2023. Created by OurTeam
            </Typography>
          </Grid>

          <Grid item className="footer_links" aria-label="figma button group">
            <Stack direction="row" spacing={2}>
              <Stack
                sx={{
                  width: { xs: '1.7rem', lg: '2.5rem' },
                  height: { xs: '1.5rem', lg: '2.5rem' },
                }}>
                <Link
                  href="https://uk-ua.facebook.com/"
                  underline="none"
                  target="_blank">
                  <AdvancedImage
                    cldImg={getImg.image('footer/ktcnkvsswuh8c89e2rjb.png')}
                    alt="facebook"
                    width="100%"
                  />
                </Link>
              </Stack>

              <Stack
                sx={{
                  width: { xs: '1.7rem', lg: '2.5rem' },
                  height: { xs: '1.5rem', lg: '2.5rem' },
                }}>
                <Link
                  href="https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2F"
                  underline="none"
                  target="_blank">
                  <AdvancedImage
                    cldImg={getImg.image('footer/mniuaxo36cyqgybjg40f.png')}
                    alt="instagram"
                    width="100%"
                  />
                </Link>
              </Stack>

              <Stack
                sx={{
                  width: { xs: '1.7rem', lg: '2.5rem' },
                  height: { xs: '1.5rem', lg: '2.5rem' },
                }}>
                <Link
                  href="https://twitter.com/?lang=uk"
                  underline="none"
                  target="_blank">
                  <AdvancedImage
                    cldImg={getImg.image('footer/j6a0n80trcx5p4ztqyqm.png')}
                    alt="twitter"
                    width="100%"
                  />
                </Link>
              </Stack>

              <Stack
                sx={{
                  width: { xs: '1.7rem', lg: '2.5rem' },
                  height: { xs: '1.5rem', lg: '2.5rem' },
                }}>
                <Link
                  href="https://www.youtube.com/"
                  underline="none"
                  target="_blank">
                  <AdvancedImage
                    cldImg={getImg.image('footer/ihssemitolz25bykodi4.png')}
                    alt="youtube"
                    width="100%"
                  />
                </Link>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </TableFooter>
    </>
  );
}

export default Footer;
