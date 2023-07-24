import React, { useState } from 'react';
import { List, Box, Divider, Typography, Grid } from '@mui/material';

function OrdersList() {
  const [orders, setOrders] = useState([
    {
      itemNo: 1,
      name: 'iPhone 11',
      currentPrice: 462,
      color: 'Black',
      brand: 'Apple',
      storage: '64gb',
      date: '16-04-2023',
      img: 'https://res.cloudinary.com/dtvbxgclg/image/upload/c_mpad,h_200,w_129/r_15:15/v1/phones/fwd6fpjujgtt8cclohli.jpg',
    },
    {
      itemNo: 2,
      name: 'iPhone 12',
      currentPrice: 662,
      color: 'Yellow',
      brand: 'Apple',
      storage: '128gb',
      date: '20-04-2023',
      img: 'https://res.cloudinary.com/dtvbxgclg/image/upload/c_mpad,h_200,w_129/r_15:15/v1/phones/fwd6fpjujgtt8cclohli.jpg',
    },
    {
      itemNo: 3,
      name: 'iPhone 13',
      currentPrice: 800,
      color: 'White',
      brand: 'Apple',
      storage: '256gb',
      date: '24-04-2023',
      img: 'https://res.cloudinary.com/dtvbxgclg/image/upload/c_mpad,h_200,w_129/r_15:15/v1/phones/fwd6fpjujgtt8cclohli.jpg',
    },
  ]);

  return (
    <Box sx={{ marginTop: { xs: '35px', md: 0 } }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: { xs: 'center', md: 'right' } }}>
        Your Orders
      </Typography>
      <Divider />
      <List>
        {orders.map((product) => (
          <Grid
            container
            sx={{
              border: '1px solid rgb(180, 180 ,180)',
              borderRadius: '7px',
              display: 'flex',
              justifyContent: 'space-between',
              padding: '10px 10px',
              marginTop: '10px',
            }}
            key={product.itemNo}>
            <Grid
              item
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                fontSize: '1.3rem',
                color: '#fff',
                backgroundColor: 'rgb(43, 46, 53)',
                borderRadius: '12px',
                padding: '0 10px',
              }}>
              <Box>
                {product.name} {product.color}
              </Box>
              <Box>{product.storage} </Box>
              <Box>{product.currentPrice}$</Box>
              <Box sx={{ textAlign: 'right' }}>{product.date}</Box>
            </Grid>
            <Grid item>
              <Box>
                <img height="100px" width="100px" src={product.img} alt="?" />
              </Box>
            </Grid>
          </Grid>
        ))}
      </List>
    </Box>
  );
}

export default OrdersList;
