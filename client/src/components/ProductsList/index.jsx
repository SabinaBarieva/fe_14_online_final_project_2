import { React, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Grid, Box, Pagination } from '@mui/material';
import { AdvancedImage } from '@cloudinary/react';
import getImg from '../../cloudinary';
import { fetchProducts } from '../../redux/slices/productsSlice';
import ProductCard from '../ProductCard';
import StyledGrid from '../../themes/themeProductsList';
import { getAllHomeProducts } from '../../redux/slices/allProdsHomeSlice';
import LoadingAnimation from '../Loading';
import {
  homePageProducts,
  isFetchingAllProducts,
  isFetchingProductsList,
  productsList,
  totalNumberProducts,
  productsSort,
} from '../../redux/selectors';
import filterProdsNewArrival from '../Functions/filterNewArrivals/filterNewArrival';
import shuffleArray from '../Functions/ShuffleArray/shuffleArray';

function ProductsList({ urlFilter }) {
  const [currentPage, setCurrentPage] = useState(1);
  const total = useSelector(totalNumberProducts);
  const filteredProds = useSelector(productsList);
  const prodsForHomePage = useSelector(homePageProducts);
  const sortBy = useSelector(productsSort);
  const isFetchingProducts = useSelector(isFetchingProductsList);
  const isFetchingHomeProds = useSelector(isFetchingAllProducts);
  const location = useLocation();
  const currentPath = location.pathname;
  const dispatch = useDispatch();

  // Fetching products
  useEffect(() => {
    dispatch(
      fetchProducts({
        startPage: currentPage,
        urlFilter,
      })
    );
  }, [dispatch, currentPage, sortBy, urlFilter]);

  useEffect(() => {
    dispatch(getAllHomeProducts());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [urlFilter, sortBy]);

  // Pagination and showing products
  const productsPerPage = 12;
  const countPagination = total ? Math.ceil(total / productsPerPage) : 0;
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = currentPage * productsPerPage;
  // Products page
  const productsSliced = filteredProds.slice(startIndex, endIndex);
  // Home page

  const shuffledNewArrivals = shuffleArray(
    filterProdsNewArrival(prodsForHomePage)
  );

  const isFetching =
    currentPath === '/' ? isFetchingHomeProds : isFetchingProducts;
  const itemsNotFound = (
    <AdvancedImage
      width="100%"
      cldImg={getImg.image('notfound/xmmnsd6dme5uk3ft2qes')}
      alt="Sorry,No items in Sight.Dive into Our Amazing Tech Collection!"
    />
  );
  return (
    <div style={{ width: '100%' }} data-testid="products-list">
      {isFetching ? (
        <LoadingAnimation />
      ) : (
        <div>
          <Grid
            container
            spacing={{ xs: 5, sm: 2, md: 3, lg: 3 }}
            sx={{ padding: '0 1%', margin: '0 auto', width: '90%' }}>
            {currentPath === '/' &&
              shuffledNewArrivals.map((product) => (
                <StyledGrid
                  item
                  xs={6}
                  sm={6}
                  md={4}
                  lg={4}
                  xl={3}
                  key={product.itemNo}
                  sx={{ alignItems: 'baseline' }}>
                  <ProductCard product={product} />
                </StyledGrid>
              ))}
            {productsSliced.length === 0 &&
              currentPath === '/product' &&
              itemsNotFound}
            {currentPath === '/product' &&
              productsSliced.map((product) => (
                <Grid
                  display="flex"
                  justifyContent="center"
                  item
                  xs={6}
                  sm={6}
                  md={6}
                  lg={4}
                  xl={3}
                  key={product.itemNo}
                  height="auto"
                  sx={{
                    alignItems: 'baseline',
                    paddingTop: '5%',
                  }}>
                  <ProductCard product={product} />
                </Grid>
              ))}
          </Grid>
          {currentPath !== '/' && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <Box>
                <Pagination
                  data-testid="pagination"
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

ProductsList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  urlFilter: PropTypes.object.isRequired,
};

export default ProductsList;
