import React from 'react';
import { Container, Stack } from '@mui/material';
import ProductsList from '../../components/ProductsList';
import Filter from '../../components/Filter';

function ProductsContent() {
  return (
    <Stack direction={{ md: 'row', sm: 'column' }}>
      <Filter />
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          paddingLeft: '1%',
          paddingRight: '1%',
          margin: '2% auto',
        }}>
        <ProductsList />
      </Container>
    </Stack>
  );
}
export default ProductsContent;
