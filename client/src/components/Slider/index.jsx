/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
// import { Paper, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { LinearProgress } from '@mui/material';
import { useTheme } from '@mui/system';
import { getAllProducts } from '../../redux/slices/allProdsSlice';
import ProductCard from '../ProductCard';

function Slider() {
  const theme = useTheme();
  const products = useSelector((state) => state.allProducts.allProds);
  const isFetching = useSelector((state) => state.allProducts.isFetching);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts({}));
  }, [dispatch]);
  return (
    <div>
      {isFetching ? (
        <LinearProgress
          sx={{
            backgroundColor: `${theme.palette.primary.light}`,
            width: '80%',
            mx: 'auto',
          }}
        />
      ) : (
        <Carousel>
          {products
            .filter((el) => el.sale === true)
            .map((product) => (
              // key={product.itemNo}
              <ProductCard product={product} />
            ))}
        </Carousel>
      )}
    </div>
  );
}

export default Slider;
