import React from 'react';
import { Stack } from '@mui/material';
import ProductsList from '../../components/ProductsList';
import Filter from '../../components/Filter';

function ProductsContent() {
  return (
    <Stack
      sx={{ width: '90%', margin: '0 auto' }}
      direction={{ md: 'row', sm: 'column' }}>
      <Filter />
      <ProductsList />
    </Stack>
  );
}
export default ProductsContent;
