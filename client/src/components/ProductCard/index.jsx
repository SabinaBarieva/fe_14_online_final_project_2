import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  Card,
  CardContent,
  Typography,
  Box,
  useMediaQuery,
} from '@mui/material';
import { styled, useTheme } from '@mui/system';
import SvgIcon from '@mui/material/SvgIcon';
import { AdvancedImage, lazyload, responsive } from '@cloudinary/react';
import getImg from '../../cloudinary';
import CartIcon from '../Icons/cartIcon/cartIcon';
import { RadiusButton } from '../Buttons';
import { setProduct } from '../../redux/slices/productSlice';
import { addToBasket } from '../../redux/slices/basketSlice';

const CardContainer = styled(Card)(({ theme }) => ({
  outline: 'solid 1px transparent',
  marginBottom: '5%',
  minWidth: 'fit-content',
  backgroundColor: 'transparent',
  [theme.breakpoints.between('xs', 'md')]: {
    maxWidth: '150px',
  },
  [theme.breakpoints.between('md', 'lg')]: {
    maxWidth: '183px',
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: '203px',
  },
}));

/* const CardImg = styled(AdvancedImage)(({ theme }) => ({
  minWidth: '160px',
  minHeight: '200px',
  borderRadius: '10px',
  marginBottom: '5%',
  maxHeight: '296px',
  maxWidth: '203px',
  [theme.breakpoints.between('xs', 'md')]: {
    maxWidth: '150px',
  },
  [theme.breakpoints.between('md', 'lg')]: {
    maxWidth: '183px',
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: '203px',
  },
})); */

const DetailButton = styled(RadiusButton)(({ theme }) => ({
  fontSize: '0.625rem',
  lineHeight: '0.75rem',
  maxWidth: '104px',
  maxHeight: '26px',
  [theme.breakpoints.between('xs', 'md')]: {
    textTransform: 'capitalize',
    minWidth: '77px',
    minHeight: '17px',
  },
  [theme.breakpoints.between('md', 'lg')]: {
    fontSize: '0.75rem',
    minWidth: '111px',
    minHeight: '28px',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '0.625rem',
    minWidth: '104px',
    minHeight: '26px',
  },
}));

const AddToCartBtn = styled(RadiusButton)(({ theme }) => ({
  backgroundColor: 'white',
  /*  minWidth: '29px',
  minHeight: '17px', */
  maxWidth: '40px',
  maxHeight: '26px',
  position: 'relative',
  '&:hover': {
    backgroundColor: theme.palette.primary.buttonhover,
  },
  '& svg': {
    marginTop: '5%',
    minWidth: '13px',
    minHeight: '12px',
    maxWidth: '18px',
    maxHeight: '20px',
  },
  [theme.breakpoints.between('xs', 'md')]: {
    minWidth: '29px',
    minHeight: '17px',
    '& svg': {
      width: '13px',
      height: '12px',
    },
  },
  [theme.breakpoints.between('md', 'lg')]: {
    minWidth: '42px',
    minHeight: '29px',
    '& svg': {
      width: '18px',
      height: '20px',
    },
  },
  [theme.breakpoints.up('lg')]: {
    minWidth: '40px',
    minHeight: '26px',
    '& svg': {
      width: '17px',
      height: '18px',
    },
  },
}));

const CardInfo = styled(CardContent)(({ theme }) => ({
  color: theme.palette.primary.light,
  fontFamily: theme.typography.fontFamily.secondary,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  padding: '0',
  paddingLeft: '15%',
  marginTop: '3%',
  width: '80%',
  [theme.breakpoints.between('xs', 'sm')]: {
    display: 'block',
    textAlign: 'left',
    paddingLeft: '5%',
  },
  '&:last-child': {
    paddingBottom: '0',
  },
}));

const ProductName = styled(Typography)(({ theme }) => ({
  fontWeight: '700',
  [theme.breakpoints.between('xs', 'sm')]: {
    fontSize: '1rem',
    lineHeight: '1rem',
    marginBottom: '2%',
  },
  [theme.breakpoints.up('xl')]: {
    fontSize: '.875rem',
    lineHeight: '1rem',
  },
}));

const ProductPrice = styled(Typography)(({ theme }) => ({
  fontWeight: '400',
  fontSize: '.875rem',
  lineHeight: '1rem',
  /* [theme.breakpoints.between('xs', 'sm')]: {
    marginBottom: '10px',
  }, */
}));

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPath = location.pathname;
  const theme = useTheme();
  /*   const xsBreakpoint = useMediaQuery(theme.breakpoints.between('xs', 'md'));
  const mdBreakpoint = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const lgBreakpoint = useMediaQuery(theme.breakpoints.up('lg'));

  const breakpointDimensions = {
    xs: { width: 150, height: 200 },
    sm: { width: 150, height: 200 },
    md: { width: 183, height: 289 },
    lg: { width: 203, height: 293 },
  }; */

  const handleDetailClick = () => {
    dispatch(setProduct(product));
  };

  const onClickAdd = () => {
    const item = {
      name: product.name,
      itemNo: product.itemNo,
      imageUrls: product.imageUrls,
      currentPrice: product.currentPrice,
      quantity: product.quantity,
      count: 0,
    };
    dispatch(addToBasket(item));
  };

  return (
    <CardContainer sx={{ boxShadow: 'none' }}>
      <Box sx={{ position: 'relative' }}>
        <AdvancedImage
          width="100%"
          cldImg={getImg.image(product.imageUrls[0])}
          alt={product.name + product.color}
        />
        <Box
          sx={{
            bottom: '2%',
            left: '50%',
            width: '100%',
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            transform: 'translate(-50%, -50%)',
          }}>
          <Link to={`/product/${product.itemNo}`} style={{ marginRight: '7%' }}>
            <DetailButton onClick={handleDetailClick}>Detail</DetailButton>
          </Link>
          <AddToCartBtn onClick={onClickAdd} variant="solid" disabled={false}>
            <SvgIcon
              sx={{
                position: 'absolute',
                top: '50%',
                left: '51%',
                transform: 'translate(-50%, -50%)',
              }}>
              <CartIcon />
            </SvgIcon>
          </AddToCartBtn>
        </Box>
      </Box>
      {currentPath !== '/' ? (
        <CardInfo>
          <ProductName
            variant="h2"
            sx={{
              fontSize: {
                sm: '1rem',
                lg: '0.875rem',
              },
            }}>
            {product.name}
          </ProductName>
          <ProductPrice>
            {`\u0024`}
            {product.currentPrice}
          </ProductPrice>
        </CardInfo>
      ) : null}
    </CardContainer>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    currentPrice: PropTypes.number.isRequired,
    categories: PropTypes.string.isRequired,
    imageUrls: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    quantity: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    storage: PropTypes.string.isRequired,
    itemNo: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    guarantee: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
