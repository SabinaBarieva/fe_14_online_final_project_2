import React from 'react';
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
import { AdvancedImage } from '@cloudinary/react';
import { minimumPad } from '@cloudinary/url-gen/actions/resize';
import { byRadius } from '@cloudinary/url-gen/actions/roundCorners';
import getImg from '../../cloudinary';
import CartIcon from '../Icons/cartIcon/cartIcon';
import { setProduct } from '../../redux/slices/productSlice';
import { changeQuantityInBasketActionCreator } from '../../redux/slices/basketSlice/changeQuantity';

import {
  CardContainer,
  DetailButton,
  AddToCartBtn,
  Label,
  CardInfo,
  ProductName,
  ProductPrice,
} from '../../themes/themeProductCard';

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPath = location.pathname;
  const theme = useTheme();
  const xsBreakpoint = useMediaQuery(theme.breakpoints.between('xs', 'md'));
  const mdBreakpoint = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const lgBreakpoint = useMediaQuery(theme.breakpoints.up('lg'));

  const getImageSize = () => {
    const currentBreakpoints = {
      xs: xsBreakpoint,
      md: mdBreakpoint,
      lg: lgBreakpoint,
    };
    const imgSizesProductsPage = {
      xs: { width: 150, height: 200 },
      sm: { width: 150, height: 200 },
      md: { width: 183, height: 289 },
      lg: { width: 183, height: 289 },
    };

    const imageSizesHomePage = {
      xs: { width: 129, height: 200 },
      sm: { width: 129, height: 200 },
      md: { width: 196, height: 322 },
      lg: { width: 269, height: 418 },
    };
    const currentBreakpoint = Object.keys(currentBreakpoints).find(
      (breakpoint) => currentBreakpoints[breakpoint]
    );
    if (
      currentPath !== '/' &&
      currentBreakpoint &&
      imgSizesProductsPage[currentBreakpoint]
    ) {
      return imgSizesProductsPage[currentBreakpoint];
    }
    if (
      currentPath === '/' &&
      currentBreakpoint &&
      imageSizesHomePage[currentBreakpoint]
    ) {
      return imageSizesHomePage[currentBreakpoint];
    }
    return { width: 150, height: 200 };
  };

  const handleDetailClick = () => {
    dispatch(setProduct(product));
  };

  const onClickAdd = () => {
    dispatch(changeQuantityInBasketActionCreator(product, 1));
  };
  return (
    <CardContainer
      sx={{ boxShadow: `5px 5px 5px #ACACAC`, alignItems: 'baseline' }}>
      <Box sx={{ position: 'relative', padding: '10% 0' }}>
        <AdvancedImage
          width="100%"
          cldImg={getImg
            .image(product.imageUrls[0])
            .resize(
              minimumPad()
                .width(getImageSize().width)
                .height(getImageSize().height)
            )
            .roundCorners(byRadius(15, 15))}
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
            alignItems: 'end',
          }}>
          <Link to={`/product/${product.itemNo}`} style={{ marginRight: '7%' }}>
            <DetailButton onClick={handleDetailClick}>Detail</DetailButton>
          </Link>
          {product.quantity !== 0 ? (
            <AddToCartBtn onClick={onClickAdd} variant="solid">
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
          ) : (
            <Box
              sx={{
                borderRadius: '10px',
                border: '1px solid #ACACAC',
                padding: '3% 4%',
                backgroundColor: 'white',
              }}>
              <Label>Out of stock</Label>
            </Box>
          )}
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
    storage: PropTypes.string,
    itemNo: PropTypes.string,
    description: PropTypes.string,
    guarantee: PropTypes.string,
  }).isRequired,
};

export default ProductCard;
