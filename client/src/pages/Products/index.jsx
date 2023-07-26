import React from 'react';
import { Box, Container, Stack } from '@mui/material';
import ProductsList from '../../components/ProductsList';
import Filter from '../../components/Filter';
import DropdownMenu from '../../components/DropdownMenu';

function ProductsContent() {
  return (
    <Box>
      <Stack
        sx={{ width: '90%', margin: '0 auto' }}
        direction={{ md: 'row', sm: 'column' }}>
        <Filter />
        <Container>
          <DropdownMenu />
          <ProductsList />
        </Container>
      </Stack>
    </Box>
  );
}
export default ProductsContent;
