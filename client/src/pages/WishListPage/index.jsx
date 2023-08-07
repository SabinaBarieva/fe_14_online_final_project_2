import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  TableCell,
  TableHead,
  Divider,
  Typography,
  TableRow,
  Container,
  Tooltip,
  IconButton,
  TableBody,
  Button,
  Box,
} from '@mui/material';
import { AdvancedImage } from '@cloudinary/react';
import { Link } from 'react-router-dom';
import { selectWishlist } from '../../redux/selectors';
import cld from '../../cloudinary';
import theme from '../../themes/theme';
import ProductWishlist from '../../components/ProductWishlist';
import { changeQuantityInBasketActionCreator } from '../../redux/slices/basketSlice/changeQuantity';
import { modalAddBasket } from '../../redux/slices/modalAddToBasket';
import PulseAnimation from '../../components/Animations';
import ModalAdd from '../../components/ModalAdd';

const columns = [
  { id: 'product', label: '', width: '25%' },
  { id: 'name', label: '', width: '30%' },
  { id: 'addToCart', label: '', width: '25%' },
  { id: 'delFromWishlist', label: '', width: '15%' },
];

function WishListPage() {
  const wishlist = useSelector(selectWishlist);
  const dispatch = useDispatch();
  const onClickAdd = (product) => {
    dispatch(changeQuantityInBasketActionCreator(product, 1));
    dispatch(modalAddBasket(product));
  };
  if (wishlist.itemsWishlist.length === 0) {
    return (
      <Container
        sx={{
          width: '100%',
          paddingBottom: '10px',
          maxWidth: '1440px',
          margin: '0 auto 20px',
        }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: { xs: 'center', md: 'right' } }}>
          Your Wishlist
        </Typography>
        <Divider />
        <Typography
          gutterBottom
          sx={{ textAlign: { xs: 'center', md: 'right' } }}>
          You do not have some products at wish list.
        </Typography>
        <Container
          style={{ padding: '0' }}
          sx={{ textAlign: { xs: 'center', md: 'end' } }}>
          <Link
            style={{ textDecoration: 'none', color: '#000000' }}
            to="/product">
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                textAlign: 'center',
                '&:hover': {
                  backgroundColor: { xs: '#211F1C', md: '#fff' },
                  color: { xs: '#F5F7FB', md: '#211F1C' },
                  border: {
                    xs: '1px solid #211F1C',
                    md: '1px solid #211F1C',
                  },
                },
              }}>
              Go to PRODUCTS !
            </Typography>
          </Link>
          <AdvancedImage
            key={Math.random()}
            cldImg={cld.image('ordernow/tzepi8iiziil22pyvjmb.png')}
            width="40%"
            height="20%"
          />
        </Container>
      </Container>
    );
  }
  return (
    <Container sx={{ width: '100%', paddingBottom: '10px' }}>
      <ModalAdd />
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: { xs: 'center', md: 'right' },
          fontSize: { xs: '1.2rem', sm: '1.8rem', md: '2.2rem' },
        }}>
        Your Wishlist
      </Typography>
      <Divider />
      <Table
        key={Math.random()}
        sx={{
          margin: '0 auto',
        }}>
        <TableHead key={Math.random()}>
          <TableRow key={Math.random()}>
            {columns.map((column) => (
              <TableCell
                sx={{
                  color: '#000000',
                  fontWeight: theme.typography.const.fontWeight.semibold,
                  borderBottom: '0',
                  width: column.width,
                }}
                key={column.id}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {wishlist.itemsWishlist.map((product) => (
            <TableRow
              key={Math.random()}
              sx={{
                marginBottom: '1rem',
                boxShadow: '5px 5px 5px #acacac',
                borderRadius: '15px',
                '&:hover': {
                  transition: 'scale 0.5s',
                },
              }}>
              <TableCell
                key={Math.random()}
                sx={{
                  fontWeight: '600',
                  color: '#000000',
                  padding: {
                    xs: '0.5rem',
                    md: '1.5rem 1.5rem 1.5rem 0',
                  },
                  borderBottom: '0',
                }}>
                <Tooltip title="Detail">
                  <Link
                    style={{ textDecoration: 'none', color: '#000000' }}
                    to={`/product/${product.itemNo}`}>
                    <AdvancedImage
                      key={Math.random()}
                      cldImg={cld.image(product.imageUrls[0])}
                      width="65%"
                      height="60%"
                    />
                  </Link>
                </Tooltip>
              </TableCell>
              <TableCell
                key={Math.random()}
                sx={{
                  // fontFamily: theme.typography.const.fontFamily.primary,
                  fontWeight: theme.typography.const.fontWeight.semibold,
                  padding: {
                    xs: '0.5rem',
                    md: '1.5rem',
                  },
                  borderBottom: '0',
                  fontSize: { xs: '0.7rem', sm: '1rem', md: '1.2rem' },
                }}>
                <Tooltip title="Detail">
                  <Link
                    style={{ textDecoration: 'none', color: '#000000' }}
                    to={`/product/${product.itemNo}`}>
                    {product.name}
                  </Link>
                </Tooltip>
              </TableCell>
              <TableCell
                key={Math.random()}
                sx={{
                  padding: {
                    xs: '0.1rem',
                    sm: '0.4rem',
                    md: '1,5rem',
                  },
                  fontSize: { xs: '0.7rem', sm: '1rem', md: '1.2rem' },
                  borderBottom: '0',
                }}>
                <PulseAnimation scaleTo={1.1} config={{ duration: 1000 }} loop>
                  <Button
                    disabled={product.quantity === 0}
                    sx={{
                      marginLeft: '15px',
                      fontSize: { xs: '0.44rem', sm: '0.59rem', md: '1.2rem' },
                      padding: '3px 8px',
                      backgroundColor: { xs: '#F5F7FB', md: '#211F1C' },
                      color: { xs: '#616467', md: '#fff' },
                      borderRadius: '7px',
                      border: '1px solid #211F1C',
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
                </PulseAnimation>
              </TableCell>
              <TableCell
                key={Math.random()}
                sx={{
                  padding: {
                    xs: '0.7rem',
                    sm: '1rem',
                    md: '1.5rem',
                  },
                  borderBottom: '0',
                }}>
                <Tooltip title="Delete">
                  <IconButton
                    sx={{
                      fontSize: {
                        xs: '15px',
                        sm: '25px',
                        md: '30px',
                        lg: '40px',
                      },
                    }}
                    key={Math.random()}>
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
export default WishListPage;
