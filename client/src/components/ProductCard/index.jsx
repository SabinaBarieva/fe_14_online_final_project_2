import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Box, SvgIcon, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/system';
import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';
import { setProduct } from '../../redux/slices/productSlice';
import {
  addToBasket,
  basketProductCreator,
} from '../../redux/slices/basketSlice';
import {
  AddToCartBtn,
  CardInfo,
  DetailButton,
  ProductName,
  ProductPrice,
  Label,
} from '../../themes/themeProductCard';
import CartIcon from '../Icons/cartIcon/cartIcon';

const Card = styled.div`
  box-shadow: 5px 5px 5px #acacac;
  align-items: baseline;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-image: url(${(props) => props.imageurl});
  background-size: ${(props) => props.size};
  background-position: center;
  border-radius: 15px;
  position: relative;
  background-repeat: no-repeat;
`;

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
      xs: { width: '150px', height: '200px' },
      sm: { width: '150px', height: '200px' },
      md: { width: '183px', height: '289px' },
      lg: { width: '183px', height: '289px' },
    };

    const imageSizesHomePage = {
      xs: { width: '129px', height: '200px' },
      sm: { width: '129px', height: '200px' },
      md: { width: '196px', height: '322px' },
      lg: { width: '269px', height: '418px' },
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
    return { width: '150px', height: '200px' };
  };

  const handleDetailClick = () => {
    dispatch(setProduct(product));
  };

  const onClickAdd = () => {
    dispatch(addToBasket(basketProductCreator({ product, cartQuantity: 0 })));
  };

  const imageUrl = (publicId) => {
    return `https://res.cloudinary.com/dtvbxgclg/image/upload/${publicId}`;
  };
  const getImageUrl = (productItem) =>
    currentPath === '/'
      ? imageUrl(productItem.arrivalPhoto)
      : imageUrl(productItem.imageUrls[0]);
  const backgroundSize = currentPath === '/' ? 'cover' : 'contain';

  const [springs, api] = useSpring(() => ({
    from: { scale: 1 },
  }));
  const handleFocus = () => {
    api.start({
      from: {
        scale: 1,
      },
      to: {
        scale: 1.1,
      },
    });
  };

  const handleMouseEnter = () => {
    api.start({
      from: {
        scale: 1.1,
      },
      to: {
        scale: 1,
      },
    });
  };
  return (
    <animated.div
      onMouseEnter={handleFocus}
      onMouseLeave={handleMouseEnter}
      style={{
        width: `${getImageSize().width}`,
        height: `${getImageSize().height}`,
        ...springs,
      }}>
      <Card
        width={getImageSize().width}
        height={getImageSize().height}
        imageurl={getImageUrl(product)}
        alt={product.name + product.color}
        size={backgroundSize}>
        <Box
          sx={{
            bottom: '-2%',
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

          {product.quantity !== 0 && (
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
          )}

          {product.quantity === 0 && (
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
        {currentPath !== '/' && (
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
        )}
      </Card>
    </animated.div>
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
    arrivalPhoto: PropTypes.string,
  }).isRequired,
};

export default ProductCard;
