import React from 'react';
import { Link } from 'react-router-dom';
/* import { Container } from '@mui/material';
import PropTypes from 'prop-types'; */
import { Box, Typography, Container } from '@mui/material';
import { styled } from '@mui/system';
import ProductsList from '../../components/ProductsList';
import { SquareButton } from '../../components/Buttons';
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
  [theme.breakpoints.between('xs', 'md')]: {
    fontSize: '1.063rem',
  },
  [theme.breakpoints.between('md', 'lg')]: {
    fontSize: '1.75rem',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '2.8rem',
  },
}));

const AllProductsBtn = styled(SquareButton)(() => ({
  minWidth: '128px',
  minHeight: '32px',
  maxWidth: '218px',
  maxHeight: '54px',
}));
function HomeContent() {
  // const id = useSelector() id товара
  /* const id = 123; */

  return (
    <Container maxWidth="xxl" sx={{ padding: '0 3%' }}>
      <Category />
      <ModalBasket />
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          backgroundColor: '#FCF9F6',
        }}>
        <SectionTitle variant="h2">Daily Sale</SectionTitle>
        <Box sx={{ width: '30%', margin: '0% auto' }}>
          <Slider />
        </Box>
        <SectionTitle variant="h2">Products</SectionTitle>
        <Box>
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
      </Container>
    </Container>
  );
}
export default HomeContent;
