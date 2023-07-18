/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';

import { useSelector, useDispatch } from 'react-redux';
import { LinearProgress } from '@mui/material';
import { useTheme } from '@mui/system';
import { AdvancedImage } from '@cloudinary/react';
import { getAllSaleProducts } from '../../redux/slices/allProdsSlice';
import getImg from '../../cloudinary';
import {
  allProductsInBase,
  allProductsIsFetching,
} from '../../redux/selectors';

function Slider() {
  const theme = useTheme();
  const products = useSelector(allProductsInBase);
  const isFetching = useSelector(allProductsIsFetching);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSaleProducts());
  }, [dispatch]);
  return (
    <div>
      {isFetching ? (
        <LinearProgress
          sx={{
            backgroundColor: `${theme.palette.primary.light}`,
            width: '100%',
            mx: 'auto',
          }}
        />
      ) : (
        <Carousel>
          {products.map((product) => (
            // key={product.itemNo}
            <AdvancedImage
              className="main-photo"
              width="100%"
              cldImg={getImg.image(product.saleImg)}
              alt="our-photo"
            />
          ))}
        </Carousel>
      )}
    </div>
  );
}

export default Slider;
