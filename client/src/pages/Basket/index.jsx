/* eslint-disable react/button-has-type */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  Container,
  Tooltip,
  IconButton,
  Grid,
  Button,
  TableBody,
  Typography,
} from '@mui/material';
import styled from '@emotion/styled';
import { BiPlus, BiMinus } from 'react-icons/bi';
import { LiaTrashSolid } from 'react-icons/lia';
import { AdvancedImage } from '@cloudinary/react';
import { pad } from '@cloudinary/url-gen/actions/resize';
import { color as clColor } from '@cloudinary/url-gen/qualifiers/background';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import ButtonOrder from '../../components/Order/ButtonOrder';
import { selectCart } from '../../redux/selectors';
import { changeQuantityInBasketActionCreator } from '../../redux/slices/basketSlice/changeQuantity';
import { deleteFromBasketActionCreator } from '../../redux/slices/basketSlice/deleteFromBasket';
import cld from '../../cloudinary';
import theme from '../../themes/theme';
import BasketEmpty from '../../components/BasketEmpty';
import ModalBasket from '../../components/ModalForBasket';

const columns = [
  { id: 'product', label: 'Product', width: '25%' },
  { id: 'name', label: '', width: '30%' },
  { id: 'price', label: 'Price', width: '15%' },
  { id: 'quantity', label: 'Quantity', width: '15%' },
  { id: 'total', label: 'Total', width: '15%' },
];

const Title = styled(Typography)(() => ({
  fontWeight: theme.typography.const.fontWeight.bold,
  letterSpacing: '0rem',
  color: theme.palette.primary,
  textAlign: 'end',
  margin: '2rem 1.5rem 2rem 0',

  [theme.breakpoints.between('xs', 'md')]: {
    fontSize: '1rem',
  },
  [theme.breakpoints.between('md', 'lg')]: {
    fontSize: '1.3rem',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '1.5rem',
  },
}));

function BasketContent() {
  const { priceAll, itemsBasket } = useSelector(selectCart);
  const dispatch = useDispatch();
  if (!priceAll) {
    return <BasketEmpty />;
  }
  return (
    <Container sx={{ width: '100%' }}>
      <ModalBasket />
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
                  padding: {
                    xs: '0.3rem',
                    sm: '0.5rem',
                    md: '1rem',
                    lg: '2rem',
                  },
                  width: column.width,
                  fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' },
                }}
                key={column.id}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {itemsBasket.map(({ product, cartQuantity }) => (
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
                  // fontFamily: theme.typography.const.fontFamily.primary,
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
                  //   fontFamily: theme.typography.const.fontFamily.primary,
                  fontSize: { xs: '0.7rem', sm: '1rem', md: '1.2rem' },
                  padding: {
                    xs: '0.5rem',
                    md: '1.5rem',
                  },
                  borderBottom: '0',
                }}>
                $ {product.currentPrice * cartQuantity}
              </TableCell>
              <TableCell
                key={Math.random()}
                sx={{
                  //   fontFamily: theme.typography.const.fontFamily.primary,
                  padding: {
                    xs: '0.1rem',
                    sm: '0.4rem',
                    md: '1,5rem',
                  },
                  fontSize: { xs: '0.7rem', sm: '1rem', md: '1.2rem' },
                  borderBottom: '0',
                }}>
                <IconButton
                  disabled={cartQuantity === 1}
                  onClick={() =>
                    dispatch(changeQuantityInBasketActionCreator(product, -1))
                  }>
                  <BiMinus fontSize="15" />
                </IconButton>
                {cartQuantity}
                <IconButton
                  onClick={() =>
                    dispatch(changeQuantityInBasketActionCreator(product, 1))
                  }>
                  <BiPlus fontSize="15" />
                </IconButton>
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
                    onClick={() =>
                      dispatch(deleteFromBasketActionCreator(product))
                    }
                    sx={{
                      fontSize: {
                        xs: '15px',
                        sm: '25px',
                        md: '30px',
                        lg: '40px',
                      },
                    }}
                    key={Math.random()}
                    aria-label="delete">
                    <LiaTrashSolid />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Grid
        sx={{
          display: 'grid',
          justifyContent: 'flex-end',
          width: '100%',
        }}>
        <Grid>
          <Title>Total order: $ {priceAll}</Title>
        </Grid>
        <Grid
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginRight: '1.5rem',
          }}>
          <Grid
            item
            md={12}
            xs={12}
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              // width: '100%',
            }}>
            <ButtonOrder />
          </Grid>
          <Grid
            item
            md={12}
            xs={12}
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              // width: '100%',
            }}>
            <Link to="/">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: { xs: '#F5F7FB', md: '#211F1C' },
                  color: { xs: '#616467', md: '#fff' },
                  borderRadius: '7px',
                  border: '1px solid #211F1C',
                  width: {
                    xs: '7rem',
                    sm: '7rem',
                    md: '9rem',
                  },
                  height: {
                    xs: '2.4rem',
                    sm: '2.5rem',
                    md: '3rem',
                  },
                  '&:hover': {
                    backgroundColor: theme.palette.primary.light,
                    color: '#F5F7FB',
                  },
                }}>
                Close
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default BasketContent;
