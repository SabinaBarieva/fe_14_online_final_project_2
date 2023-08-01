/* eslint-disable no-underscore-dangle */
import React from 'react';
import {
  List,
  Box,
  Divider,
  Typography,
  ListItem,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  Paper,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AdvancedImage } from '@cloudinary/react';
import cld from '../../cloudinary';
import { userOrders } from '../../redux/selectors';

function OrdersList() {
  const orders = useSelector(userOrders);

  const getDate = (setDate) => {
    const date = new Date(setDate);
    const day = String(date.getDate());
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  };

  if (!orders) {
    return (
      <Typography
        gutterBottom
        sx={{ textAlign: { xs: 'center', md: 'right' } }}>
        You do not have orders.
      </Typography>
    );
  }
  return (
    <Box sx={{ marginTop: { xs: '35px', md: 0 } }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: { xs: 'center', md: 'right' } }}>
        Your Orders
      </Typography>
      <Divider />
      <List sx={{ maxHeight: '500px', overflowY: 'auto', marginBottom: '5px' }}>
        {orders.map((order) => (
          <ListItem
            key={order.orderNo}
            sx={{
              border: '1px solid rgb(180, 180 ,180)',
              borderRadius: '7px',
              padding: '10px 10px',
              marginTop: '10px',
              overflowY: 'auto',
            }}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{ padding: '10px', fontSize: '0.6rem' }}
                      colSpan={3}>
                      order &#8470;:{' '}
                      <b style={{ fontSize: '0.7rem' }}>{order.orderNo}</b>
                    </TableCell>
                    <TableCell sx={{ padding: '10px', fontSize: '0.57rem' }}>
                      {getDate(order.date)}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.products.map((prod) => (
                    <TableRow key={prod._id}>
                      <TableCell
                        sx={{
                          padding: '5px',
                          minWidth: '60px',
                          maxWidth: '100px',
                        }}>
                        <Link
                          style={{ textDecoration: 'none', color: '#000000' }}
                          to={`/product/${prod.product.itemNo}`}>
                          <AdvancedImage
                            key={Math.random()}
                            cldImg={cld.image(prod.product.imageUrls[0])}
                            width="85%"
                            height="70%"
                          />
                        </Link>
                      </TableCell>
                      <TableCell sx={{ padding: '10px', fontSize: '0.75rem' }}>
                        <Link
                          style={{ textDecoration: 'none', color: '#000000' }}
                          to={`/product/${prod.product.itemNo}`}>
                          {prod.product.name} {prod.product.color}
                        </Link>
                      </TableCell>
                      <TableCell sx={{ padding: '10px', fontSize: '0.75rem' }}>
                        {prod.cartQuantity}
                      </TableCell>
                      <TableCell
                        sx={{ padding: '10px', fontSize: '0.75rem' }}
                        align="right">
                        {prod.product.currentPrice * prod.cartQuantity}&#36;
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell sx={{ padding: '10px' }} colSpan={3}>
                      Total:
                    </TableCell>
                    <TableCell
                      sx={{ padding: '10px' }}
                      align="right"
                      colSpan={1}>
                      <b>{order.totalSum}&#36;</b>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default OrdersList;
