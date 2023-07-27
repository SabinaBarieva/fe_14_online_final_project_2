import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Container, Stack } from '@mui/material';
import ProductsList from '../../components/ProductsList';
import Filter from '../../components/Filter';
import ModalBasket from '../../components/ModalForBasket';
import DropdownMenu from '../../components/DropdownMenu';
import { fetchFilters } from '../../redux/slices/filtersSlice';

function ProductsContent() {
  const dispatch = useDispatch();
  const isLoadedFilters = useSelector((state) => state.filters.isLoaded);
  const { price } = useSelector(({ filters }) => filters.availableFilters);
  const selectedCategories = useSelector(({ filters }) => filters.categories);
  const minPrice = useSelector(({ filters }) => filters.minPrice);
  const maxPrice = useSelector(({ filters }) => filters.maxPrice);
  const sort = useSelector((state) => state.products.sort);
  const [priceMinBoundary, setPriceMinBoundary] = useState();
  const [priceMaxBoundary, setPriceMaxBoundary] = useState();
  const [urlFilter, setUrlFilter] = useState('');
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
    setUrlFilter(fullFilterURL);
  };

  useEffect(() => {
    if (!isLoadedFilters) dispatch(fetchFilters());
    else {
      const { min: priceMin, max: priceMax } = price;
      setPriceMinBoundary(priceMin);
      setPriceMaxBoundary(priceMax);
    }
    filterLinkConstructor();
  }, [isLoadedFilters, selectedCategories, minPrice, maxPrice, sort]);
  return (
    <Box>
      <ModalBasket />
      <Stack
        sx={{ width: '90%', margin: '15px auto' }}
        direction={{ md: 'row', sm: 'column' }}>
        <Filter
          priceMinBoundary={priceMinBoundary}
          priceMaxBoundary={priceMaxBoundary}
          urlFilter={urlFilter}
        />
        <Container>
          <DropdownMenu />
          <ProductsList urlFilter={urlFilter} />
        </Container>
      </Stack>
    </Box>
  );
}
export default ProductsContent;
