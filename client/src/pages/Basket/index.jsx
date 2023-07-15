/* eslint-disable react/button-has-type */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
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
  deleteBasket,
  minusItem,
} from '../../redux/slices/basketSlice';
import cld from '../../cloudinary';
import theme from '../../themes/theme';
import BasketEmpty from '../../components/BasketEmpty';
import ModalBasket from '../../components/ModalForBasket';

const columns = [
  { id: 'product', label: 'Product' },
  { id: 'name', label: '' },
  { id: 'price', label: 'Price' },
  { id: 'quantity', label: 'Quantity' },
  { id: 'total', label: 'Total' },
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
  const totalCount = itemsBasket.reduce((sum, item) => sum + item.count, 0);
  const dispatch = useDispatch();

  if (!priceAll) {
    return <BasketEmpty />;
  }
  return (
    <Container maxWidth="xxl">
      <ModalBasket />
      <Table
        key={Math.random()}
        style={{
          padding: '2rem',
        }}>
        <TableHead key={Math.random()}>
          <TableRow key={Math.random()}>
            {columns.map((column) => (
              <TableCell
                style={{
                  fontFamily: theme.typography.fontFamily.primary,
                  color: '#000000',
                  fontWeight: '500',
                  fontSize: '1rem',
                  borderBottom: '0',
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
                style={{
                  fontFamily: theme.typography.fontFamily.primary,
                  fontWeight: '600',
                  color: '#000000',
                  padding: '10px',
                }}>
                <AdvancedImage
                  key={Math.random()}
                  cldImg={cld
                    .image(el.imageUrls[0])
                    .resize(
                      pad().width(80).height(100).background(clColor('white'))
                    )}
                />
              </TableCell>
              <TableCell
                key={Math.random()}
                style={{
                  fontFamily: theme.typography.fontFamily.primary,
                  fontWeight: '500',
                  color: '#000000',
                  padding: '5px',
                }}>
                {el.name}
              </TableCell>
              <TableCell
                key={Math.random()}
                style={{
                  fontFamily: theme.typography.fontFamily.primary,
                  padding: '10px',
                }}>
                $ {el.currentPrice * el.count}
              </TableCell>
              <TableCell
                key={Math.random()}
                style={{
                  fontFamily: theme.typography.fontFamily.primary,
                  padding: '5px',
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
              <TableCell key={Math.random()}>
                <Tooltip title="Delete">
                  <IconButton key={Math.random()} aria-label="delete">
                    <LiaTrashSolid
                      fontSize="15"
                      onClick={() =>
                        dispatch(deleteBasket({ itemNo: el.itemNo }))
                      }
                    />
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
    </Container>
  );
}

export default BasketContent;
