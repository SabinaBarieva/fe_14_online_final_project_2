import { React, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Grid, Box, Pagination, LinearProgress } from '@mui/material';
import { styled, spacing, useTheme } from '@mui/system';
import PropTypes from 'prop-types';
import { fetchProducts } from '../../redux/slices/productsSlice';
import ProductCard from '../ProductCard';
import { RadiusButton } from '../Buttons';

const StyledGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'baseline',
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

const LoadMoreBtn = styled(RadiusButton)(({ theme }) => ({
  fontWeight: '400',
  fontFamily: theme.typography.fontFamily.secondary,
  minWidth: '100px',
  minHeight: '35px',
  maxWidth: '140px',
  maxHeight: '80px',
  margin: '20%  0 10% 0',
  [theme.breakpoints.between('xs', 'md')]: {
    fontSize: '1rem',
    minWidth: '100px',
    minHeight: '35px',
  },
  [theme.breakpoints.between('md', 'lg')]: {
    fontSize: '1.1rem',
    minWidth: '120px',
    minHeight: '40px',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '1.25rem',
    minWidth: '140px',
    minHeight: '45px',
  },
}));

function ProductsList({ perPage }) {
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [isLoadMoreClicked, setLoadMoreClicked] = useState(false);
  const total = useSelector((state) => state.products.total);
  const storeProducts = useSelector((state) => state.products.products);
  const categories = useSelector((state) => state.filters.categories);
  const minFilterPrice = useSelector((state) => state.filters.minPrice);
  const maxFilterPrice = useSelector((state) => state.filters.maxPrice);
  const formattedMinPrice = minFilterPrice !== null ? minFilterPrice : 7;
  const formattedMaxPrice = maxFilterPrice !== null ? maxFilterPrice : 100000;

  const isFetching = useSelector((state) => state.products.isFetching);
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
  }, [dispatch, currentPage, formattedMinPrice, formattedMaxPrice]);

  const countPagination = Math.round(total / perPage);
  const location = useLocation();
  const currentPath = location.pathname;
  const products = isLoadMoreClicked ? loadedProducts : storeProducts;

  useEffect(() => {
    if (isLoadMoreClicked) {
      setLoadedProducts((prevProducts) => [...prevProducts, ...storeProducts]);
    }
  }, [isLoadMoreClicked, storeProducts]);

  const gridSpacing =
    currentPath === '/'
      ? { xs: 1.5, sm: 2, md: 2.5, lg: 6 }
      : { xs: 1, sm: 1.5, md: 2, lg: 3 };

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
                  key={product.itemNo}>
                  <ProductCard product={product} />
                </StyledGrid>
              ) : (
                <Grid
                  display="flex"
                  justifyContent="center"
                  alignItems="baseline"
                  item
                  xs={6}
                  sm={6}
                  md={6}
                  lg={3}
                  key={product.itemNo}
                  height="auto">
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
              <LoadMoreBtn
                sx={{ textTransform: 'capitalize' }}
                variant="solid"
                onClick={() => {
                  setLoadMoreClicked(true);
                  setCurrentPage((prevPage) => prevPage + 1);
                }}>
                Load More
              </LoadMoreBtn>
              <Box>
                <Pagination
                  count={countPagination}
                  color="primary"
                  page={currentPage}
                  onChange={(_, num) => {
                    setCurrentPage(num);
                    setLoadMoreClicked(false);
                    setLoadedProducts([]);
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
