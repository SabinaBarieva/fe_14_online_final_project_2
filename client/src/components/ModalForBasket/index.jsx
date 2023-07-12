import { Close } from '@mui/icons-material';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart } from '../../redux/selectors';
import { closeModalBasket } from '../../redux/slices/basketSlice';

function ModalBasket() {
  const { priceAll, itemsBasket, modal, modalText } = useSelector(selectCart);

  const dispatch = useDispatch();

  return (
    <Dialog
      open={modal}
      sx={{
        textAlign: 'center',
      }}>
      <Close
        sx={{
          position: 'absolute',
          top: '8px',
          right: '8px',
        }}
        onClick={() => {
          dispatch(closeModalBasket());
        }}
      />
      <DialogTitle>Not enough products</DialogTitle>
      <DialogContent>
        <DialogContentText>{modalText}</DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
export default ModalBasket;
