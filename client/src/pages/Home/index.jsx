import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid } from '@mui/material';
import { useTheme } from '@mui/system';
import { AdvancedImage } from '@cloudinary/react';
import getImg from '../../cloudinary';
import ProductsList from '../../components/ProductsList';
import ArrowIcon from '../../components/Icons/arrowIcon/index';
import Category from '../../components/Category';
import ModalBasket from '../../components/ModalForBasket';
import Carousel from '../../components/Carousel';
// import Slider from '../../components/Slider';
import { SectionTitle, AllProductsBtn } from '../../themes/themeHomePage';

function HomeContent() {
  const theme = useTheme();
  return (
    <div
      style={{
        marginTop: '85px',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
      <Category />
      <ModalBasket />
      <SectionTitle variant="h2">Daily Sale</SectionTitle>
      <Carousel />
      <div
        style={{
          width: '100%',
          margin: '10% auto 0',
          backgroundColor: '#FCF9F6',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
        }}>
        <SectionTitle variant="h2">Products</SectionTitle>
        <Box sx={{ width: '90%', margin: '0 auto' }}>
          <ProductsList perPage={8} />
        </Box>
        <Box sx={{ margin: '10% auto 5%' }}>
          <Link to="/product">
            <AllProductsBtn sx={{ alignItems: 'center' }}>
              <Typography
                sx={{
                  fontSize: '0.75rem',
                  textTransform: 'capitalize',
                  marginRight: '5%',
                }}>
                All Products
              </Typography>
              <ArrowIcon />
            </AllProductsBtn>
          </Link>
        </Box>
      </div>
      <SectionTitle variant="h2">Benefits using our service</SectionTitle>
      <Box sx={{ width: '80%', margin: '0 auto 10%' }}>
        <Grid container spacing={{ md: 3, lg: 5 }}>
          <Grid
            item
            display="flex"
            flexDirection="column"
            alignItems="center"
            xs={12}
            sm={12}
            md={6}
            lg={4}
            sx={{ marginBottom: '5%' }}>
            <Box sx={{ width: '20%' }}>
              <AdvancedImage
                width="100%"
                cldImg={getImg.image('about/tdmzj6zmka75fjrpdqm7.png')}
                alt="Best Quality"
              />
            </Box>
            <Typography
              variant="h6"
              sx={{ margin: '0 auto', fontSize: '1rem' }}>
              Best Quality
            </Typography>
            <Typography
              sx={{ textAlign: 'center', width: '70%', fontSize: '0.8rem' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              consectetur, purus
            </Typography>
          </Grid>
          <Grid
            item
            display="flex"
            flexDirection="column"
            alignItems="center"
            xs={12}
            sm={12}
            md={6}
            lg={4}
            sx={{ marginBottom: '5%' }}>
            <Box sx={{ width: '20%' }}>
              <AdvancedImage
                width="100%"
                cldImg={getImg.image('about/wcldiw2aoks31z8tejzu.png')}
                alt="Free Shipping"
              />
            </Box>
            <Typography
              variant="h6"
              sx={{ margin: '0 auto', fontSize: '1rem' }}>
              Free Shipping
            </Typography>
            <Typography
              sx={{ textAlign: 'center', width: '70%', fontSize: '0.8rem' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              consectetur, purus
            </Typography>
          </Grid>
          <Grid
            item
            display="flex"
            flexDirection="column"
            alignItems="center"
            xs={12}
            sm={12}
            md={6}
            lg={4}
            sx={{
              [`${theme.breakpoints.down('lg')}`]: {
                margin: '3% auto 5%',
                justifyContent: 'center',
              },
            }}>
            <Box sx={{ width: '20%' }}>
              <AdvancedImage
                width="100%"
                cldImg={getImg.image('about/fruf9huhljjedgj4vclo.png')}
                alt="Warranty"
              />
            </Box>
            <Typography
              variant="h6"
              sx={{ margin: '0 auto', fontSize: '1rem' }}>
              Warranty
            </Typography>
            <Typography
              sx={{ textAlign: 'center', width: '70%', fontSize: '0.8rem' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              consectetur, purus
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default HomeContent;
