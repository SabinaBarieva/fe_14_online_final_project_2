/* eslint-disable react/button-has-type */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableCell, TableHead, TableRow } from '@mui/material';
import styled from '@emotion/styled';
import { BiPlus, BiMinus } from 'react-icons/bi';
import { LiaTrashSolid } from 'react-icons/lia';
import { connect } from 'mongoose';
import ButtonOrder from '../../components/Order/ButtonOrder';
import { selectCart } from '../../redux/selectors';
import {
  addToBasket,
  deleteBasket,
  minusItem,
} from '../../redux/slices/basketSlice';

const columns = [
  { id: 'product', label: 'Product' },
  { id: 'price', label: 'Price' },
  { id: 'quantity', label: 'Quantity' },
  { id: 'total', label: 'Total' },
];
const Img = styled('TableCell')({
  lineHeight: '47px',
  letterSpacing: '0.015em',
  color: '#9A9292',
});

function BasketContent() {
  const { priceAll, itemsBasket } = useSelector(selectCart);
  const totalCount = itemsBasket.reduce((sum, item) => sum + item.count, 0);
  const dispatch = useDispatch();

  if (!priceAll) {
    return <div>Gecnj</div>;
  }
  return (
    <>
      <Table key={Math.random()}>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        {itemsBasket.map((el) => (
          <TableRow key={Math.random()}>
            <Img>
              <img width={123} height={123} src={el.img} alt="" />
              {el.name}
            </Img>
            <TableCell>$ {el.price * el.count}</TableCell>
            <TableCell>
              <button
                disabled={el.count === 1}
                onClick={() => dispatch(minusItem({ id: el.id }))}>
                <BiMinus />
              </button>
              <b>{el.count}</b>
              <button onClick={() => dispatch(addToBasket({ id: el.id }))}>
                <BiPlus />
              </button>
            </TableCell>
            <TableCell>
              <button onClick={() => dispatch(deleteBasket({ id: el.id }))}>
                <LiaTrashSolid />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </Table>
      <ButtonOrder />
    </>
  );
}

export default BasketContent;
