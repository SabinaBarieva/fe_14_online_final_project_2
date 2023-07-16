import { Close } from '@mui/icons-material';
import { Dialog, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCart } from '../../redux/selectors';
import { closeModalBasket } from '../../redux/slices/basketSlice';

function ModalBasket() {
  const { modal, modalText } = useSelector(selectCart);

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
          top: { xs: '20px', md: '30px' },
          right: { xs: '20px', md: '30px' },
        }}
        onClick={() => {
          dispatch(closeModalBasket());
        }}
      />
      <DialogTitle
        sx={{ background: '#d3dbe3', fontSize: { sx: '22px', md: '32px' } }}>
        Not enough products
      </DialogTitle>
      <DialogContentText
        sx={{
          margin: '20px',
          padding: '20px',
          fontSize: { sx: '17px', md: '27px' },
        }}>
        {modalText}
      </DialogContentText>
    </Dialog>
  );
}
export default ModalBasket;
