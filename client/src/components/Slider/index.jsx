/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Link } from 'react-router-dom';
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
            <Link
              to={`/product/${product.itemNo}`}
              style={{ marginRight: '7%' }}>
              <AdvancedImage
                key={product.itemNo}
                className="main-photo"
                width="100%"
                cldImg={getImg.image(product.saleImg)}
                alt="our-photo"
              />
            </Link>
          ))}
        </Carousel>
      )}
    </div>
  );
}

export default Slider;
