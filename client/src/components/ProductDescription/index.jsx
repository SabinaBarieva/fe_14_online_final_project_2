/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import { AdvancedImage } from '@cloudinary/react';
import { getProduct } from '../../redux/slices/productSlice';
import {
  addSeveraltoBasket,
  closeModalBasket,
} from '../../redux/slices/basketSlice';
import {
  currentProduct,
  currentProductIsLoading,
  allProductsInBase,
} from '../../redux/selectors';
import getImg from '../../cloudinary';
import {
  Title,
  Description,
  Price,
  CountBoxes,
  CountInput,
  Guarantee,
} from '../../themes/themeProduct';
import ModalBasket from '../ModalForBasket';
import PageNotFound from '../NotFoundPage';

function ProductDescription() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const isLoading = useSelector(currentProductIsLoading);
  const {
    quantity,
    name,
    currentPrice,
    imageUrls,
    color,
    brand,
    storage,
    itemNo,
    description,
    guarantee,
  } = useSelector(currentProduct);
  const all = useSelector(allProductsInBase);
  const allProducts = [...all];
  const isIdExist = allProducts.find((item) => item.itemNo === id);

  useEffect(() => {
    dispatch(getProduct(id));
    return () => {
      dispatch(closeModalBasket());
    };
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
    const item = {
      itemNo,
      imageUrls,
      name,
      currentPrice,
      quantity,
      count: countToBasket,
    };
    dispatch(addSeveraltoBasket(item));
  };

  const [mainImage, setMainImage] = useState('');
  useEffect(() => {
    if (imageUrls) {
      setMainImage(imageUrls[0]);
    }
  }, [imageUrls]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!isIdExist) {
    return <PageNotFound />;
  }

  if (imageUrls) {
    return (
      <>
        <ModalBasket />
        <Grid container sx={{ width: '91%', margin: '25px auto' }}>
          <Grid
            item
            xs={12}
            md={5}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
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
                margin: '15px 0',
                order: { xs: '0', md: '1' },
              }}>
              {imageUrls.map((photo) => (
                <Grid
                  key={photo}
                  item
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
              {brand} {name} {storage} {color}
            </Title>
            <Description>{description}</Description>
            <Price>
              {quantity === 0 ? 'Not in stock' : `${currentPrice}$`}
            </Price>
            <Guarantee>Apple guarantee {guarantee}</Guarantee>
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
                  disabled={countToBasket === quantity}
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
                    fontFamily: 'Roboto',
                    marginTop: { xs: '10px', md: '0' },
                    padding: '9px 18px',
                    backgroundColor: { xs: '#F5F7FB', md: '#211F1C' },
                    color: { xs: '#616467', md: '#fff' },
                    borderRadius: 0,
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
                  Add to basket
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default ProductDescription;
