import { React, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Grid, Box, Pagination } from '@mui/material';
import { AdvancedImage } from '@cloudinary/react';
import getImg from '../../cloudinary';
import { fetchProducts } from '../../redux/slices/productsSlice';
import ProductCard from '../ProductCard';
/* import {
  categoriesFilter,
  homePageProducts,
  isFetchingAllProducts,
  isFetchingProductsList,
  maximalPrice,
  minimalPrice,
  productsList,
  totalNumberProducts,
  productsSort,
} from '../../redux/selectors'; */
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

function ProductsList({ urlFilter }) {
  const [currentPage, setCurrentPage] = useState(1);
  const total = useSelector(totalNumberProducts);
  const filteredProds = useSelector(productsList);
  const prodsForHomePage = useSelector(homePageProducts);
  const sortBy = useSelector(productsSort);
  /*  const categories = useSelector(categoriesFilter);
  const minFilterPrice = useSelector(minimalPrice);
  const maxFilterPrice = useSelector(maximalPrice);
  const formattedMinPrice = minFilterPrice !== null ? minFilterPrice : 7;
  const formattedMaxPrice = maxFilterPrice !== null ? maxFilterPrice : 100000; */
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
  function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = shuffledArray[i];
      shuffledArray[i] = shuffledArray[j];
      shuffledArray[j] = temp;
    }
    return shuffledArray;
  }

  const filterProdsNewArrival = (productsForFilter) =>
    productsForFilter.filter(
      (product) => product.newArrival === true && product.quantity !== 0
    );
  const shuffledNewArrivals = shuffleArray(
    filterProdsNewArrival(prodsForHomePage)
  );
  console.log(shuffledNewArrivals);
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
    <div style={{ width: '100%' }}>
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
            {productsSliced.length === 0 && itemsNotFound}
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
  urlFilter: PropTypes.string.isRequired,
};

export default ProductsList;
