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
} from '@mui/material';
import styled from '@emotion/styled';
import { BiPlus, BiMinus } from 'react-icons/bi';
import { LiaTrashSolid } from 'react-icons/lia';
import { AdvancedImage } from '@cloudinary/react';
import { pad } from '@cloudinary/url-gen/actions/resize';
import { color as clColor } from '@cloudinary/url-gen/qualifiers/background';
import { Link } from 'react-router-dom';
import ButtonOrder from '../../components/Order/ButtonOrder';
import { selectCart } from '../../redux/selectors';
import {
  addToBasket,
  clearBasket,
  deleteBasket,
  minusItem,
} from '../../redux/slices/basketSlice';
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

const Title = styled('div')({
  fontWeight: '400',
  fontSize: '20px',
  lineHeight: '29px',
  color: '#000000',
  justifyContent: 'flex-end',
  display: 'flex',
  padding: '2rem',
  fontFamily: theme.typography.fontFamily.primary,
});

function BasketContent() {
  const { priceAll, itemsBasket } = useSelector(selectCart);
  /*   const totalCount = itemsBasket.reduce((sum, item) => sum + item.count, 0); */
  const dispatch = useDispatch();
  const onClickClear = () => {
    if (window.confirm('Очистить корзину?')) {
      dispatch(clearBasket());
    }
  };
  if (!priceAll) {
    return <BasketEmpty />;
  }
  return (
    <Grid>
      <ModalBasket />
      <Table
        key={Math.random()}
        sx={{
          margin: {
            xs: '0',
            sm: '1',
            md: '2rem',
            lg: '3.5rem',
          },
        }}>
        <TableHead key={Math.random()}>
          <TableRow key={Math.random()}>
            {columns.map((column) => (
              <TableCell
                sx={{
                  fontFamily: theme.typography.fontFamily.primary,
                  color: '#000000',
                  fontWeight: '500',
                  borderBottom: '0',
                  padding: {
                    xs: '0.5rem',
                    sm: '1rem',
                    md: '1.5rem',
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
          {itemsBasket.map((el) => (
            <TableRow key={Math.random()} style={{ marginBottom: '1 rem' }}>
              <TableCell
                key={Math.random()}
                sx={{
                  fontFamily: theme.typography.fontFamily.primary,
                  fontWeight: '600',
                  color: '#000000',
                  padding: {
                    xs: '0.5rem',
                    md: '1.5rem 1.5rem 1.5rem 0',
                  },
                }}>
                <Tooltip title="Detail">
                  <Link
                    style={{ textDecoration: 'none', color: '#000000' }}
                    to={`/product/${el.itemNo}`}>
                    <AdvancedImage
                      key={Math.random()}
                      cldImg={cld.image(el.imageUrls[0])}
                      width="65%"
                      height="60%"
                    />
                  </Link>
                </Tooltip>
              </TableCell>
              <TableCell
                key={Math.random()}
                sx={{
                  fontFamily: theme.typography.fontFamily.primary,
                  fontWeight: '500',
                  padding: {
                    xs: '0.5rem',
                    md: '1.5rem',
                  },
                  fontSize: { xs: '0.7rem', sm: '1.2rem', md: '1.5rem' },
                }}>
                <Tooltip title="Detail">
                  <Link
                    style={{ textDecoration: 'none', color: '#000000' }}
                    to={`/product/${el.itemNo}`}>
                    {el.name}
                  </Link>
                </Tooltip>
              </TableCell>
              <TableCell
                key={Math.random()}
                sx={{
                  fontFamily: theme.typography.fontFamily.primary,
                  fontSize: { xs: '0.7rem', sm: '1.2rem', md: '1.5rem' },
                  padding: {
                    xs: '0.5rem',
                    md: '1.5rem',
                  },
                }}>
                $ {el.currentPrice * el.count}
              </TableCell>
              <TableCell
                key={Math.random()}
                sx={{
                  fontFamily: theme.typography.fontFamily.primary,
                  padding: {
                    xs: '0.2rem',
                    sm: '1rem',
                    md: '2rem',
                  },
                  fontSize: { xs: '0.7rem', sm: '1.2rem', md: '1.5rem' },
                }}>
                <IconButton
                  disabled={el.count === 1}
                  onClick={() => dispatch(minusItem({ itemNo: el.itemNo }))}>
                  <BiMinus fontSize="15" />
                </IconButton>
                {el.count}
                <IconButton
                  onClick={() => dispatch(addToBasket({ itemNo: el.itemNo }))}>
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
                }}>
                <Tooltip title="Delete">
                  <IconButton
                    onClick={() =>
                      dispatch(deleteBasket({ itemNo: el.itemNo }))
                    }
                    sx={{
                      fontSize: {
                        xs: '15px',
                        sm: '30px',
                        md: '40px',
                        lg: '50px',
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
            // width: '100%',
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
                  backgroundColor: '#FFFFFF',
                  color: '#616467',
                  borderRadius: 0,
                  border: '1px solid #211F1C',
                  textTransform: 'none',
                  width: '130px',
                  height: '50px',
                  fontFamily: theme.typography.fontFamily.primary,
                  fontSize: '20px',
                  fontWeight: '400',
                  '&:hover': {
                    backgroundColor: '#FFF',
                    color: '#211F1C',
                    border: '1px solid #211F1C',
                  },
                }}>
                Close
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default BasketContent;
