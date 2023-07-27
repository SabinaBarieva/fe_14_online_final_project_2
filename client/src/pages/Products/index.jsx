import React from 'react';
import { Box, Container, Stack } from '@mui/material';
import ProductsList from '../../components/ProductsList';
import Filter from '../../components/Filter';
import ModalBasket from '../../components/ModalForBasket';
import DropdownMenu from '../../components/DropdownMenu';
import ModalAdd from '../../components/ModalAdd';

function ProductsContent() {
  return (
    <Box>
      <ModalBasket />
      <ModalAdd />
      <Stack
        sx={{ width: '90%', margin: '15px auto' }}
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
