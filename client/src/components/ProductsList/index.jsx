import { React, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Grid, Box, Pagination, LinearProgress } from '@mui/material';
import { useTheme } from '@mui/system';
import { fetchProducts } from '../../redux/slices/productsSlice';
import ProductCard from '../ProductCard';
import {
  categoriesFilter,
  homePageProducts,
  isFetchingAllProducts,
  isFetchingProductsList,
  maximalPrice,
  minimalPrice,
  productsList,
  totalNumberProducts,
  productsSort,
} from '../../redux/selectors';
import StyledGrid from '../../themes/themeProductsList';
import { getAllHomeProducts } from '../../redux/slices/allProdsHomeSlice';

function ProductsList() {
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const total = useSelector(totalNumberProducts);
  const filteredProds = useSelector(productsList);
  const prodsForHomePage = useSelector(homePageProducts);
  const sortBy = useSelector(productsSort);
  const categories = useSelector(categoriesFilter);
  const minFilterPrice = useSelector(minimalPrice);
  const maxFilterPrice = useSelector(maximalPrice);
  const formattedMinPrice = minFilterPrice !== null ? minFilterPrice : 7;
  const formattedMaxPrice = maxFilterPrice !== null ? maxFilterPrice : 100000;
  const isFetchingProducts = useSelector(isFetchingProductsList);
  const isFetchingHomeProds = useSelector(isFetchingAllProducts);
  const location = useLocation();
  const currentPath = location.pathname;
  const dispatch = useDispatch();
  // Fetching products
  useEffect(() => {
    dispatch(getAllHomeProducts());
    dispatch(
      fetchProducts({
        categories,
        startPage: currentPage,
        minPrice: formattedMinPrice,
        maxPrice: formattedMaxPrice,
        sort: sortBy,
      })
    );
  }, [
    dispatch,
    currentPage,
    categories,
    formattedMinPrice,
    formattedMaxPrice,
    sortBy,
  ]);

  // Pagination and showing products
  const productsPerPage = 12;
  const countPagination = total ? Math.round(total / productsPerPage) : 0;
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = currentPage * productsPerPage;
  // Products page
  const productsSliced = filteredProds.slice(startIndex, endIndex);
  function groupProductsByCategory(productsBycategory) {
    const groupedProducts = {};
    productsBycategory.forEach((product) => {
      const categoriesToShuffle = product.categories;
      if (!groupedProducts[categoriesToShuffle]) {
        groupedProducts[categoriesToShuffle] = [];
      }
      groupedProducts[categoriesToShuffle].push(product);
    });

    return groupedProducts;
  }

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

  function combinateArrays(arrays) {
    const maxLength = Math.max(...arrays.map((arr) => arr.length));
    const result = [];

    for (let i = 0; i < maxLength; i += 1) {
      arrays.forEach((arr) => {
        if (arr[i]) {
          result.push(arr[i]);
        }
      });
    }
    return result;
  }
  const filterProdsNewArrival = (productsForFilter) =>
    productsForFilter.filter(
      (product) => product.newArrival === true && product.quantity !== 0
    );

  // Home page
  const groupedNewArrivals = groupProductsByCategory(
    filterProdsNewArrival(prodsForHomePage) // треба усі продукти
  );
  const shuffledNewArrivals = shuffleArray(Object.keys(groupedNewArrivals));
  const newArrivalsToShow = combinateArrays(
    shuffledNewArrivals.map(
      (categoriesToShuffle) => groupedNewArrivals[categoriesToShuffle]
    )
  );
  // Grid spacing
  const spacingHomePage = {
    xs: 1.5,
    sm: 2,
    md: 2.5,
    lg: 6,
  };
  const spacingProductsPage = {
    xs: 5,
    sm: 2,
    md: 3,
    lg: 3,
  };
  const gridSpacing =
    currentPath === '/' ? spacingHomePage : spacingProductsPage;
  const isFetching =
    currentPath === '/' ? isFetchingHomeProds : isFetchingProducts;
  return (
    <div style={{ width: '100%' }}>
      {isFetching ? (
        <LinearProgress
          sx={{
            backgroundColor: `${theme.palette.primary.section}`,
            mx: '0 auto',
          }}
        />
      ) : (
        <div>
          <Grid
            container
            spacing={gridSpacing}
            sx={{ padding: '0 1%', margin: '0 auto', width: '90%' }}>
            {currentPath === '/'
              ? newArrivalsToShow.map((product) => (
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
                ))
              : productsSliced.map((product) => (
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
