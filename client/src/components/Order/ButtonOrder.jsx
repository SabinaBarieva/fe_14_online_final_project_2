import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Container, ThemeProvider } from '@mui/material';
import theme from '../../themes/theme';
import OrderForm from './orderForm';
import ModalOrdered from './modal';
import { openForm } from '../../redux/slices/reducersForm';

export default function ButtonOrder() {
  const dispatch = useDispatch();
  const isOpenForm = useSelector((state) => state.toolkitForm.statusForm);
  const buttons = useSelector((state) => state.toolkitForm.statusButton);
  const isOpenModal = useSelector((state) => state.toolkitModal.statusModal);

  const form = () => (isOpenForm ? <OrderForm /> : null);

  const modal = () => (isOpenModal ? <ModalOrdered /> : null);

  const showForm = () => {
    dispatch(openForm());
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        {buttons && (
          <Container>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              onClick={showForm}
            >
              Order
            </Button>
          </Container>
        )}
        {form()}
        {modal()}
      </>
    </ThemeProvider>
  );
}
