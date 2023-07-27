import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Box, SvgIcon, Tooltip, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/system';
import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';
import { setProduct } from '../../redux/slices/productSlice';
import { changeQuantityInBasketActionCreator } from '../../redux/slices/basketSlice/changeQuantity';
import { handleWishlist } from '../../redux/slices/wishlistSlice';
import { selectWishlist } from '../../redux/selectors';
import {
  AddToCartBtn,
  CardInfo,
  DetailButton,
  ProductInfo,
} from '../../themes/themeProductCard';
import CartIcon from '../Icons/cartIcon/cartIcon';
import PulseAnimation from '../Animations';
import { modalAddBasket } from '../../redux/slices/modalAddToBasket';

const Card = styled.div`
  box-shadow: 5px 5px 5px #acacac;
  align-items: baseline;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-image: url(${(props) => props.imageurl});
  background-size: ${(props) => props.size};
  background-position: center;
  transition: box-shadow 0.5s, scale 0.5s;
  border-radius: 15px;
  position: relative;
  background-repeat: no-repeat;
  background-color: white;
  overflow: hidden;
  ${(props) =>
    props.sale === true
      ? `
        &::after {
         content: 'Sale';
         color: white;
         text-align: center;
         padding-top: 27px;
         background-color: #7ba158;
         height: 65px;
         width: 65px;
         position: absolute;
         top: -15px;
         right: -18px;
         border-radius: 50%;
         transform: rotateZ(45deg);
         animation: pulsate 2s ease-in-out infinite;
    }
        `
      : ''};
  @keyframes pulsate {
    0% {
      opacity: 0.3;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.3;
    }
  }
`;

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPath = location.pathname;
  const theme = useTheme();
  const xsBreakpoint = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
  const smBreakpoint = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const mdBreakpoint = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const lgBreakpoint = useMediaQuery(theme.breakpoints.up('lg'));
  const [addedWishlist, setAddedWishlist] = useState(false);
  const { itemsWishlist } = useSelector(selectWishlist);
  console.log('item', itemsWishlist);
  let wishlist = [];

  const getImageSize = () => {
    const currentBreakpoints = {
      xs: xsBreakpoint,
      sm: smBreakpoint,
      md: mdBreakpoint,
      lg: lgBreakpoint,
    };
    const imgSizesProductsPage = {
      xs: { width: '130px', height: '200px' },
      sm: { width: '183px', height: '289px' },
      md: { width: '183px', height: '289px' },
      lg: { width: '203px', height: '296px' },
    };

    const imageSizesHomePage = {
      xs: { width: '129px', height: '200px' },
      sm: { width: '180px', height: '300px' },
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
    dispatch(changeQuantityInBasketActionCreator(product, 1));
    dispatch(modalAddBasket(product));
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
    from: {
      scale: 1,
      boxShadow: '0px 10px 20px -5px rgba(0, 0, 0, 0.4)',
    },
  }));
  const handleFocus = () => {
    api.start({
      from: {
        boxShadow: '0px 10px 20px -5px rgba(0, 0, 0, 0.4)',
        scale: 1,
      },
      to: {
        boxShadow: '0px 20px 40px -5px rgba(0, 0, 0, 0.3)',
        scale: 1.1,
      },
    });
  };
  const handleMouseEnter = () => {
    api.start({
      from: {
        boxShadow: '0px 20px 40px -5px rgba(0, 0, 0, 0.4)',
        scale: 1.1,
      },
      to: {
        boxShadow: '0px 10px 20px -5px rgba(0, 0, 0, 0.3)',
        scale: 1,
      },
    });
  };


  useEffect(() => {
    if (itemsWishlist.length) {
      if (itemsWishlist.includes(product.itemNo)) {
        setAddedWishlist(true);
      }
    }
  }, [itemsWishlist, product.itemNo]);

  const updateWishlist = (e) => {
    e.preventDefault();
    setAddedWishlist((prev) => !prev);
    if (!addedWishlist) {
      if (itemsWishlist.length) {
        if (!itemsWishlist.includes(product.itemNo)) {
          wishlist = [...itemsWishlist, product.itemNo];
        }
      } else {
        wishlist = [...itemsWishlist, product.itemNo];
      }
    } else if (itemsWishlist.length) {
      wishlist = itemsWishlist.filter((item) => item !== product.itemNo);
    }
    console.log('w', itemsWishlist);
    console.log('wish', wishlist);
    dispatch(handleWishlist(wishlist));
  };

  return (
    <Box width={getImageSize().width}>
      <animated.div
        onMouseEnter={handleFocus}
        onMouseLeave={handleMouseEnter}
        style={{
          width: `${getImageSize().width}`,
          height: `${getImageSize().height}`,
          borderRadius: '15px',
          ...springs,
        }}>
        <Card
          width={getImageSize().width}
          height={getImageSize().height}
          imageurl={getImageUrl(product)}
          alt={product.name + product.color}
          size={backgroundSize}
          sale={product.sale.toString()}>
          <Box
            width={getImageSize().width}
            sx={{
              bottom: '-2%',
              left: '50%',
              position: 'absolute',
              display: 'flex',
              justifyContent: 'space-evenly',
              transform: 'translate(-50%, -50%)',
              alignItems: 'end',
            }}>
            <Link
              to={`/product/${product.itemNo}`}
              style={{ marginRight: '7%' }}>
              <DetailButton onClick={handleDetailClick}>Detail</DetailButton>
            </Link>

            {product.quantity !== 0 && (
              <PulseAnimation scaleTo={1.1} config={{ duration: 1000 }} loop>
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
              </PulseAnimation>
            )}
            {product.quantity === 0 && (
              <Tooltip title="Out of stock">
                <span>
                  <AddToCartBtn
                    onClick={onClickAdd}
                    variant="solid"
                    disabled
                    sx={{
                      backgroundColor: 'rgba(241, 136, 147, 0.57)',
                      outline: '1 px solid rgba(241, 136, 147, 0.57)',
                    }}>
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
                </span>
              </Tooltip>
            )}
          </Box>
        </Card>
      </animated.div>
      {currentPath !== '/' && (
        <CardInfo>
          <ProductInfo
            variant="h2"
            sx={{
              fontWeight: '700',
              width: '70%',
            }}>
            {product.name}
          </ProductInfo>
          <ProductInfo>
            {`\u0024`}
            {product.currentPrice}
          </ProductInfo>
        </CardInfo>
      )}
    </Box>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    currentPrice: PropTypes.number.isRequired,
    sale: PropTypes.bool,
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
