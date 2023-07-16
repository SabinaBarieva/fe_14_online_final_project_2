import { React, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Grid, Box, Pagination, LinearProgress } from '@mui/material';
import { styled, useTheme } from '@mui/system';
import PropTypes from 'prop-types';
import { fetchProducts } from '../../redux/slices/productsSlice';
import ProductCard from '../ProductCard';
import {
  categoriesFilter,
  isFetchingProductsList,
  maximalPrice,
  minimalPrice,
  productsList,
  totalNumberProducts,
} from '../../redux/selectors';

const StyledGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  height: 'auto',
  [theme.breakpoints.between('xs', 'md')]: {
    '&:nth-of-type(n+5)': {
      display: 'none',
    },
  },
  [theme.breakpoints.between('md', 'lg')]: {
    '&:nth-of-type(n+7)': {
      display: 'none',
    },
  },
  [theme.breakpoints.up('lg')]: {
    '&:nth-of-type(n+9)': {
      display: 'none',
    },
  },
}));

function ProductsList({ perPage }) {
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const total = useSelector(totalNumberProducts);
  const products = useSelector(productsList);
  const categories = useSelector(categoriesFilter);
  const minFilterPrice = useSelector(minimalPrice);
  const maxFilterPrice = useSelector(maximalPrice);
  const formattedMinPrice = minFilterPrice !== null ? minFilterPrice : 7;
  const formattedMaxPrice = maxFilterPrice !== null ? maxFilterPrice : 100000;
  const isFetching = useSelector(isFetchingProductsList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchProducts({
        categories,
        perPage,
        startPage: currentPage,
        minPrice: formattedMinPrice,
        maxPrice: formattedMaxPrice,
      })
    );
  }, [dispatch, currentPage, categories, formattedMinPrice, formattedMaxPrice]);

  const countPagination = Math.round(total / perPage);
  const location = useLocation();
  const currentPath = location.pathname;
  const spacingHomePage = { xs: 1.5, sm: 2, md: 2.5, lg: 6 };
  const spacingProductsPage = { xs: 1, sm: 1.5, md: 2, lg: 3 };
  const gridSpacing =
    currentPath === '/' ? spacingHomePage : spacingProductsPage;
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
        <div>
          <Grid container spacing={gridSpacing}>
            {products.map((product) =>
              currentPath === '/' ? (
                <StyledGrid
                  item
                  xs={6}
                  sm={6}
                  md={4}
                  lg={3}
                  key={product.itemNo}
                  sx={{ alignItems: 'baseline' }}>
                  <ProductCard product={product} />
                </StyledGrid>
              ) : (
                <Grid
                  display="flex"
                  justifyContent="center"
                  item
                  xs={6}
                  sm={6}
                  md={6}
                  lg={3}
                  key={product.itemNo}
                  height="auto"
                  sx={{ alignItems: 'baseline' }}>
                  <ProductCard product={product} />
                </Grid>
              )
            )}
          </Grid>
          {currentPath === '/' ? null : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <Box>
                <Pagination
                  sx={{ margin: '25% auto 10%' }}
                  count={countPagination}
                  color="primary"
                  page={currentPage}
                  onChange={(_, num) => {
                    setCurrentPage(num);
                  }}
                />
              </Box>
            </Box>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductsList;

ProductsList.propTypes = {
  perPage: PropTypes.number,
};

ProductsList.defaultProps = {
  perPage: 10,
};
