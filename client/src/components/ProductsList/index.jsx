import { React, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Grid, Box, Pagination } from '@mui/material';
import { styled, spacing } from '@mui/system';
import PropTypes from 'prop-types';
import { fetchProducts } from '../../redux/slices/productsSlice';
import ProductCard from '../ProductCard';
import { RadiusButton } from '../Buttons';

const StyledGrid = styled(Grid)(({ theme }) => ({
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
  margin: '20% auto',
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
  const [currentPage, setCurrentPage] = useState(1);
  const total = useSelector((state) => state.products.total);
  const products = useSelector((state) => state.products.products);
  /* const categories = useSelector((state) => state.categories.categories); */
  const isFetching = useSelector((state) => state.products.isFetching);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts({, perPage, currentPage }));
  }, [dispatch, currentPage]);
  const countPagination = Math.round(total / perPage);
  /* const lastProductIndex = currentPage * perPage
  const firstProductIndex = lastProductIndex - perPage
  const currentProduct =  */
  const location = useLocation();
  const currentPath = location.pathname;
  /*  const handleLoadMoreClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  }; */

  const gridSpacing =
    currentPath === '/'
      ? { xs: 0.5, sm: 0.5, md: 0.5, lg: 0.5 }
      : { xs: 1, sm: 1.5, md: 2, lg: 3 };
  return (
    <div>
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Grid container spacing={gridSpacing}>
            {products.map((product) =>
              currentPath === '/' ? (
                <StyledGrid
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  item
                  xs={6}
                  sm={6}
                  md={4}
                  lg={3}
                  key={product.itemNo}
                  width="fit-content"
                  height="fit-content">
                  <ProductCard product={product} />
                </StyledGrid>
              ) : (
                <Grid
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  item
                  xs={6}
                  sm={6}
                  md={4}
                  lg={3}
                  key={product.itemNo}
                  width="fit-content"
                  height="fit-content">
                  <ProductCard product={product} />
                </Grid>
              )
            )}
          </Grid>
          {currentPath === '/' ? null : (
            <Box sx={{ mx: 'auto', width: 500 }}>
              <Box sx={{ mx: 'auto', width: 200 }}>
                <LoadMoreBtn
                  sx={{ textTransform: 'capitalize' }}
                  variant="solid">
                  Load More
                </LoadMoreBtn>
              </Box>
              <Pagination
                count={countPagination}
                color="primary"
                page={currentPage}
                onChange={(_, num) => setCurrentPage(num)}
                sx={{ mx: 'auto', width: 400 }}
              />
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
