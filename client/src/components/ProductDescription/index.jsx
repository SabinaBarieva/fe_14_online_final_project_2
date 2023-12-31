/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button, LinearProgress, Box, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid';
import { AdvancedImage } from '@cloudinary/react';
import { useTheme } from '@emotion/react';
import { getProduct } from '../../redux/slices/productSlice';
import { closeModalBasket } from '../../redux/slices/basketSlice/basketSlice';
import { changeQuantityInBasketActionCreator } from '../../redux/slices/basketSlice/changeQuantity';
import {
  currentProduct,
  currentProductIsLoading,
  errorInProduct,
} from '../../redux/selectors';
import getImg from '../../cloudinary';
import {
  Title,
  Description,
  Price,
  CountBoxes,
  CountInput,
  Guarantee,
  PrevPrice,
} from '../../themes/themeProduct';
import ModalBasket from '../ModalForBasket';
import PageNotFound from '../NotFoundPage';
import ProductWishlist from '../ProductWishlist';

// eslint-disable-next-line import/no-duplicates

function ProductDescription() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { id } = useParams();
  const isLoading = useSelector(currentProductIsLoading);
  const isError = useSelector(errorInProduct);
  const product = useSelector(currentProduct);
  const {
    quantity,
    name,
    currentPrice,
    previousPrice,
    imageUrls,
    color,
    brand,
    storage,
    itemNo,
    description,
    guarantee,
    sale,
  } = product;

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch]);

  const [countToBasket, setCountToBasket] = useState(1);
  // eslint-disable-next-line consistent-return
  const increase = () => {
    setCountToBasket(countToBasket + 1);
  };
  const decrease = () => {
    setCountToBasket(countToBasket - 1);
  };
  const onChangeValue = (value) => {
    if (+value < 1) {
      setCountToBasket('');
    } else if (+value > quantity) {
      setCountToBasket(quantity);
    } else {
      setCountToBasket(+value);
    }
  };
  const clickToBasket = () => {
    dispatch(changeQuantityInBasketActionCreator(product, countToBasket));
  };

  const [mainImage, setMainImage] = useState('');
  useEffect(() => {
    if (imageUrls) {
      setMainImage(imageUrls[0]);
    }
    return () => {
      dispatch(closeModalBasket());
    };
  }, [imageUrls]);

  if (isLoading) {
    return (
      <LinearProgress
        sx={{
          backgroundColor: `${theme.palette.primary.section}`,
        }}
      />
    );
  }

  if (isError) {
    return <PageNotFound />;
  }

  if (imageUrls) {
    return (
      <>
        <ModalBasket />
        <Box sx={{ margin: '0 20px' }}>
          <Grid
            container
            margin="25px auto"
            borderRadius="20px"
            maxWidth={theme.breakpoints.values.xl}>
            <Grid
              item
              xs={12}
              md={5}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'start',
                padding: '20px',
              }}>
              <AdvancedImage
                className="main-photo"
                width="100%"
                cldImg={getImg.image(mainImage)}
                alt="main-img"
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={7}
              sx={{
                padding: '0 20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                width: '90%',
              }}>
              <Grid
                container
                sx={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  margin: { md: '35px 0 0 0' },
                  order: { xs: '0', md: '1' },
                }}>
                {imageUrls.map((photo) => (
                  <Grid
                    key={photo}
                    item
                    sm={2}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: { sm: '144px', xs: '66px' },
                    }}>
                    <AdvancedImage
                      className="photo-from-gallery"
                      data-img={photo}
                      width="100%"
                      cldImg={getImg.image(photo)}
                      alt="mini-img"
                      onClick={(e) => {
                        setMainImage(e.target.getAttribute('data-img'));
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
              <Guarantee>{itemNo}</Guarantee>
              <Title>
                {brand || null} {name || null} {storage || null} {color}
              </Title>
              <Description>{description || null}</Description>
              <Price>
                {quantity === 0 ? 'Not in stock' : `${currentPrice}$`}
                {sale ? (
                  <PrevPrice>
                    <s>{`${previousPrice}$`}</s>
                  </PrevPrice>
                ) : null}
              </Price>
              <Guarantee>{guarantee} of guarantee </Guarantee>
              <Grid container>
                <Grid item md={4} xs={12} sx={{ display: 'flex', gap: '14px' }}>
                  <CountBoxes
                    sx={{
                      width: { xs: '35px', sm: '57px', md: '46px' },
                      height: { xs: '35px', sm: '57px', md: '46px' },
                    }}
                    disabled={countToBasket <= 1}
                    onClick={() => {
                      decrease();
                    }}>
                    -
                  </CountBoxes>
                  <CountInput
                    disabled={quantity === 0}
                    sx={{
                      width: { xs: '35px', sm: '57px', md: '46px' },
                      height: { xs: '35px', sm: '57px', md: '46px' },
                    }}
                    type="number"
                    controls={false}
                    value={countToBasket}
                    min={1}
                    onBlur={(e) => {
                      // eslint-disable-next-line no-unused-expressions
                      e.target.value === '' ? setCountToBasket(1) : null;
                    }}
                    onChange={(e) => {
                      onChangeValue(e.target.value);
                    }}
                  />
                  <CountBoxes
                    sx={{
                      width: { xs: '35px', sm: '57px', md: '46px' },
                      height: { xs: '35px', sm: '57px', md: '46px' },
                    }}
                    disabled={countToBasket === quantity || quantity === 0}
                    onClick={() => {
                      increase();
                    }}>
                    +
                  </CountBoxes>
                </Grid>
                <Grid item md={8} xs={12}>
                  <Button
                    disabled={quantity === 0}
                    sx={{
                      marginLeft: '15px',
                      // fontFamily: 'Roboto',
                      marginTop: { xs: '10px', md: '0' },
                      padding: '9px 18px',
                      backgroundColor: { xs: '#F5F7FB', md: '#211F1C' },
                      color: { xs: '#616467', md: '#fff' },
                      borderRadius: '7px',
                      border: '1px solid #211F1C',
                      '&:hover': {
                        backgroundColor: { xs: '#211F1C', md: '#fff' },
                        color: { xs: '#F5F7FB', md: '#211F1C' },
                        border: {
                          xs: '1px solid #211F1C',
                          md: '1px solid #211F1C',
                        },
                      },
                    }}
                    variant="contained"
                    onClick={() => {
                      clickToBasket();
                    }}>
                    Add to cart
                  </Button>
                  <IconButton
                    sx={{
                      margin: '0 10px',
                      color: 'red',
                      cursor: 'pointer',
                    }}>
                    <ProductWishlist product={product} />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }
}

export default ProductDescription;
