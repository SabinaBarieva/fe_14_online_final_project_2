import React, { useState } from 'react';
import { List, Box, Divider, Typography, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { userOrders } from '../../redux/selectors';

function OrdersList() {
  // const orders = useSelector(userOrders);
  // console.log(orders);
  return (
    <Box sx={{ marginTop: { xs: '35px', md: 0 } }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: { xs: 'center', md: 'right' } }}>
        Your Orders
      </Typography>
      <Divider />
      {/* <List>
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
      </List> */}
    </Box>
  );
}

export default OrdersList;
