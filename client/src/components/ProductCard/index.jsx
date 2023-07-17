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
import { RadiusButton } from '../Buttons';
import { setProduct } from '../../redux/slices/productSlice';
import { addToBasket } from '../../redux/slices/basketSlice';

const CardContainer = styled(Card)(() => ({
  outline: `solid 1px transparent`,
  borderRadius: '15px',
  marginBottom: '5%',
  height: '100%',
}));

const DetailButton = styled(RadiusButton)(({ theme }) => ({
  fontSize: '0.625rem',
  lineHeight: '0.75rem',
  maxWidth: '104px',
  maxHeight: '26px',
  [theme.breakpoints.between('xs', 'md')]: {
    textTransform: 'capitalize',
    minWidth: '77px',
    minHeight: '20px',
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
  outline: `1px solid ${theme.palette.primary.buttonhover}`,
  maxWidth: '40px',
  maxHeight: '26px',
  position: 'relative',
  '&:hover': {
    backgroundColor: theme.palette.primary.buttonhover,
    outline: `1px solid transparent`,
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
    minHeight: '20px',
    '& svg': {
      width: '17px',
      height: '16px',
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

const Label = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.dark,
  fontSize: '0.625rem',
  lineHeight: '0.75rem',
}));

const CardInfo = styled(CardContent)(({ theme }) => ({
  color: theme.palette.primary.light,
  fontFamily: theme.typography.fontFamily.secondary,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  padding: '0',
  paddingLeft: '8%',
  marginTop: '3%',
  width: '93%',
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
  width: '70%',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  [theme.breakpoints.between('xs', 'sm')]: {
    fontSize: '.9rem',
    lineHeight: '1rem',
    marginBottom: '2%',
  },
  [theme.breakpoints.up('xl')]: {
    fontSize: '.875rem',
    lineHeight: '1rem',
  },
}));

const ProductPrice = styled(Typography)(() => ({
  fontWeight: '400',
  fontSize: '.875rem',
  lineHeight: '1rem',
}));

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
