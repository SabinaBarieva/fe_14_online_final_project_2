import React from 'react';
import { Container } from '@mui/material';
import ProductsList from '../../components/ProductsList';

function ProductsContent() {
  return (
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
  );
}
export default ProductsContent;
