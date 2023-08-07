import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  TableCell,
  Divider,
  Typography,
  TableRow,
  Container,
  Tooltip,
  IconButton,
  TableBody,
  Button,
} from '@mui/material';
import { AdvancedImage } from '@cloudinary/react';
import { Link } from 'react-router-dom';
import { selectWishlist } from '../../redux/selectors';
import cld from '../../cloudinary';
import ProductWishlist from '../ProductWishlist';
import { changeQuantityInBasketActionCreator } from '../../redux/slices/basketSlice/changeQuantity';
import { modalAddBasket } from '../../redux/slices/modalAddToBasket';
import ModalAdd from '../ModalAdd';
import ModalBasket from '../ModalForBasket';

function WishList() {
  const wishlist = useSelector(selectWishlist);
  const dispatch = useDispatch();
  const onClickAdd = (product) => {
    dispatch(changeQuantityInBasketActionCreator(product, 1));
    dispatch(modalAddBasket(product));
  };
  return (
    <Container sx={{ width: '100%', paddingBottom: '10px' }}>
      <ModalAdd />
      <ModalBasket />
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: { xs: 'center', md: 'right' },
          fontSize: { xs: '1.2rem', sm: '1.8rem', md: '2.2rem' },
        }}>
        Your Wishlist
      </Typography>
      <Divider sx={{ marginBottom: '10px' }} />
      <Table
        sx={{
          margin: '0 auto',
        }}>
        <TableBody>
          {wishlist.itemsWishlist.map((product) => (
            <TableRow
              // eslint-disable-next-line no-underscore-dangle
              key={product._id}
              sx={{
                boxShadow: '5px 5px 5px #acacac',
                borderRadius: '15px',
                padding: '10px',
              }}>
              <TableCell
                sx={{
                  padding: { xs: '10px', md: '15px' },
                  minWidth: '60px',
                  maxWidth: '100px',
                  borderBottom: '0',
                  width: '30%',
                }}>
                <Link
                  style={{ textDecoration: 'none', color: '#000000' }}
                  to={`/product/${product.itemNo}`}>
                  <AdvancedImage
                    key={Math.random()}
                    cldImg={cld.image(product.imageUrls[0])}
                    width="85%"
                    height="70%"
                  />
                </Link>
              </TableCell>
              <TableCell
                sx={{
                  padding: { xs: '5px', sm: '10px', md: '15px' },
                  fontSize: { xs: '0.6rem', sm: '0.75rem', md: '1rem' },
                  borderBottom: '0',
                  width: '30%',
                }}>
                <Link
                  style={{ textDecoration: 'none', color: '#000000' }}
                  to={`/product/${product.itemNo}`}>
                  {product.name}
                </Link>
              </TableCell>
              <TableCell
                sx={{
                  padding: '5px',
                  fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.8rem' },
                  width: '10%',
                }}
                align="center">
                {product.currentPrice}&#36;
              </TableCell>
              <TableCell
                sx={{
                  padding: { xs: '5px', sm: '10px', md: '15px' },
                  borderBottom: '0',
                  textAlign: 'center',
                  width: '20%',
                }}>
                <Button
                  disabled={product.quantity === 0}
                  sx={{
                    fontSize: { xs: '0.44rem', sm: '0.5rem', md: '1rem' },
                    padding: '3px',
                    backgroundColor: { xs: '#F5F7FB', md: '#211F1C' },
                    color: { xs: '#616467', md: '#fff' },
                    borderRadius: '7px',
                    border: '1px solid #211F1C',
                    minWidth: { xs: '55px', sm: '60px', md: '120px' },
                    '&:hover': {
                      backgroundColor: { xs: '#211F1C', md: '#fff' },
                      color: { xs: '#F5F7FB', md: '#211F1C' },
                      border: {
                        xs: '1px solid #211F1C',
                        md: '1px solid #211F1C',
                      },
                    },
                  }}
                  variant="contained"
                  onClick={() => {
                    onClickAdd(product);
                  }}>
                  Add to cart
                </Button>
              </TableCell>
              <TableCell
                sx={{
                  padding: '5px',
                  borderBottom: '0',
                  width: '10%',
                }}>
                <Tooltip title="Delete">
                  <IconButton
                    sx={{
                      padding: '5px',
                    }}>
                    <ProductWishlist product={product} />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
export default WishList;
