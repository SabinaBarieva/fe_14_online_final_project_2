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
  const [priceMinBoundary, setPriceMinBoundary] = useState();
  const [priceMaxBoundary, setPriceMaxBoundary] = useState();
  useEffect(() => {
    if (!isLoadedFilters) dispatch(fetchFilters());
    else {
      const { min: priceMin, max: priceMax } = price;
      setPriceMinBoundary(priceMin);
      setPriceMaxBoundary(priceMax);
    }
  }, [isLoadedFilters]);
  return (
    <Box>
      <ModalBasket />
      <Stack
        sx={{ width: '90%', margin: '15px auto' }}
        direction={{ md: 'row', sm: 'column' }}>
        <Filter
          priceMinBoundary={priceMinBoundary}
          priceMaxBoundary={priceMaxBoundary}
        />
        <Container>
          <DropdownMenu />
          <ProductsList />
        </Container>
      </Stack>
    </Box>
  );
}
export default ProductsContent;
