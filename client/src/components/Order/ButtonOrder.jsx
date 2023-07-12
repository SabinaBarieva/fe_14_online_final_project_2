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
        <Container>
          <StyledButton
            variant="contained"
            color="primary"
            style={{ borderRadius: 0, textTransform: 'none' }}
            onClick={showForm}>
            Check Out
          </StyledButton>
        </Container>
      )}
      {form()}
      {modal()}
    </>
  );
}
