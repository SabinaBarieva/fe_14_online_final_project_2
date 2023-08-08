import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Container, Stack } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import ProductsList from '../../components/ProductsList';
import Filter from '../../components/Filter';
import ModalBasket from '../../components/ModalForBasket';
import DropdownMenu from '../../components/DropdownMenu';
import {
  fetchFilters,
  addCategory,
  setMinPrice,
  setMaxPrice,
} from '../../redux/slices/filtersSlice';
import ModalAdd from '../../components/ModalAdd';
import { sortBy } from '../../redux/slices/productsSlice';

function ProductsContent() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const isLoadedFilters = useSelector((state) => state.filters.isLoaded);
  const { price } = useSelector(({ filters }) => filters.availableFilters);
  const selectedCategories = useSelector(({ filters }) => filters.categories);
  const minPrice = useSelector(({ filters }) => filters.minPrice);
  const maxPrice = useSelector(({ filters }) => filters.maxPrice);
  const sort = useSelector((state) => state.products.sort);
  const [priceMinBoundary, setPriceMinBoundary] = useState();
  const [priceMaxBoundary, setPriceMaxBoundary] = useState();

  const filterLinkConstructor = () => {
    // categories;
    const categoryFilter =
      selectedCategories.length > 0
        ? `categories=${selectedCategories.join(',')}`
        : '';
    // price
    let priceFilter = '';
    if (minPrice !== null) priceFilter += `&minPrice=${minPrice}`;
    if (maxPrice !== null) priceFilter += `&maxPrice=${maxPrice}`;
    // sort
    let sortOrder;
    if (sort === 'currentPrice') {
      sortOrder = '&sort=currentPrice';
    } else if (sort === '-currentPrice') {
      sortOrder = '&sort=-currentPrice';
    } else sortOrder = '';
    // full link
    const fullFilterURL = categoryFilter + priceFilter + sortOrder;
    if (fullFilterURL.size !== 0) {
      setSearchParams(fullFilterURL);
    } else {
      setSearchParams({});
    }
  };

  const setFiltersByUrl = () => {
    const categoiesInUrl = searchParams.get('categories');
    if (categoiesInUrl !== null) {
      const arrFromFilters = categoiesInUrl.split(',');
      arrFromFilters.forEach((category) => {
        dispatch(addCategory(category));
      });
    }
    //
    const minPriceInUrl = searchParams.get('minPrice');
    if (minPriceInUrl) {
      dispatch(setMinPrice(+minPriceInUrl));
    }
    //
    const maxPriceInUrl = searchParams.get('maxPrice');
    if (maxPriceInUrl) {
      dispatch(setMaxPrice(+maxPriceInUrl));
    }
    //
    const sortInUrl = searchParams.get('sort');
    if (sortInUrl) {
      dispatch(sortBy(sortInUrl));
    }
  };

  useEffect(() => {
    // dispatch(clearProduct());
    setFiltersByUrl();
  }, []);

  useEffect(() => {
    if (!isLoadedFilters) dispatch(fetchFilters());
    else {
      const { min: priceMin, max: priceMax } = price;
      setPriceMinBoundary(priceMin);
      setPriceMaxBoundary(priceMax);
    }
    filterLinkConstructor();
  }, [
    isLoadedFilters,
    selectedCategories,
    minPrice,
    maxPrice,
    sort,
    searchParams,
  ]);
  return (
    <Box>
      <ModalBasket />
      <ModalAdd />
      <Stack
        sx={{ width: '90%', margin: '15px auto' }}
        direction={{ md: 'row', sm: 'column' }}>
        <Filter
          priceMinBoundary={priceMinBoundary}
          priceMaxBoundary={priceMaxBoundary}
        />
        <Box sx={{ width: '100%' }}>
          <DropdownMenu />
          <ProductsList urlFilter={searchParams} />
        </Box>
      </Stack>
    </Box>
  );
}
export default ProductsContent;
