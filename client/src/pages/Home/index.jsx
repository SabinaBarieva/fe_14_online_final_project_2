import React from 'react';
import { Link } from 'react-router-dom';
/* import { Container } from '@mui/material';
import PropTypes from 'prop-types'; */
import { Box, Typography, Container, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { Title } from '@mui/icons-material';
import ProductsList from '../../components/ProductsList';
import { RadiusButton } from '../../components/Buttons';
import ArrowIcon from '../../components/Icons/arrowIcon/index';
import Category from '../../components/Category';
import ModalBasket from '../../components/ModalForBasket';
import Slider from '../../components/Slider';

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily.primary,
  fontWeight: '700',
  letterSpacing: '0rem',
  color: theme.palette.primary,
  margin: '5% auto',
  [theme.breakpoints.between('xs', 'sm')]: {
    fontSize: '1.09rem',
  },
  [theme.breakpoints.between('sm', 'md')]: {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.between('md', 'lg')]: {
    fontSize: '1.9rem',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '2.3rem',
  },
}));

const AllProductsBtn = styled(RadiusButton)(() => ({
  minWidth: '128px',
  minHeight: '32px',
  maxWidth: '218px',
  maxHeight: '54px',
}));
function HomeContent() {
  // const id = useSelector() id товара
  /* const id = 123; */

  return (
    <div>
      <Category />
      <ModalBasket />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          marginBottom: '20px',
          backgroundColor: '#FCF9F6',
        }}>
        <SectionTitle variant="h2">Daily Sale</SectionTitle>
        <Box sx={{ width: '100%', margin: '0 auto' }}>
          <Slider />
        </Box>
        <SectionTitle variant="h2">Products</SectionTitle>
        <Box sx={{ width: '90%', margin: '0 auto' }}>
          <ProductsList perPage={8} />
        </Box>
        <Box sx={{ margin: '10% auto' }}>
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
        <Box>
          <SectionTitle variant="h2">Benefits using our service</SectionTitle>
          <Grid container>
            <Grid item>
              <Title variant="h6">Best Quality</Title>
              <Typography sx={{ textAlign: 'center' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                consectetur, purus id{' '}
              </Typography>
            </Grid>
            <Grid item>
              <Title variant="h3">Free Shipping</Title>
              <Typography sx={{ textAlign: 'center' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                consectetur, purus id{' '}
              </Typography>
            </Grid>
            <Grid item>
              <Title variant="h3">Warranty</Title>
              <Typography sx={{ textAlign: 'center' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                consectetur, purus id{' '}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}
export default HomeContent;
