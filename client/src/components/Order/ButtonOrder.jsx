import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from '@mui/material';
import OrderForm from './orderForm';
import ModalOrdered from './modal';
import { openForm } from '../../redux/slices/formSlice';
import { StyledButton } from '../../themes/themeOrder';

export default function ButtonOrder() {
  const dispatch = useDispatch();
  const isOpenForm = useSelector((state) => state.form.statusForm);
  const buttons = useSelector((state) => state.form.statusButton);
  const isOpenModal = useSelector((state) => state.modal.statusModal);

  const form = () => (isOpenForm ? <OrderForm /> : null);

  const modal = () => (isOpenModal ? <ModalOrdered /> : null);

  const showForm = () => {
    dispatch(openForm());
  };

  return (
    <>
      {buttons && (
        <StyledButton
          variant="contained"
          sx={{
            width: {
              xs: '7rem',
              sm: '7rem',
              md: '9rem',
            },
            height: {
              xs: '2rem',
              sm: '2.5rem',
              md: '3rem',
            },
            minHeight: '5px !important',
            backgroundColor: { xs: '#F5F7FB', md: '#211F1C' },
            color: { xs: '#616467', md: '#fff' },
            padding: 0,
            marginRight: '10px !important',
            '&:hover': {
              backgroundColor: '#616467',
              color: '#F5F7FB',
            },
          }}
          color="primary"
          onClick={showForm}>
          Check Out
        </StyledButton>
      )}
      {form()}
      {modal()}
    </>
  );
}
