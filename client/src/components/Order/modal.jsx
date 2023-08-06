import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from '@mui/material';
import { Close } from '@mui/icons-material';
import { closeModal } from '../../redux/slices/modalSlice';
import clearBasket from '../../redux/slices/basketSlice/clearBasket';
import AnimatedText from './animation';
import {
  StyledTypography,
  StyledButton,
  StyledIconButton,
  StyledModal,
  StyledModalContainer,
} from '../../themes/themeOrder';
import { fetchOrders } from '../../redux/slices/ordersSlice';

export default function ModalOrdered() {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal.statusModal);
  const textModal = useSelector((state) => state.modal.text);
  const modalRef = useRef(null);
  const isLoading = useSelector((state) => state.order.isLoading);

  const closed = () => {
    dispatch(closeModal());
    dispatch(clearBasket());
    dispatch(fetchOrders());
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closed();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return isLoading ? (
    <Container
      sx={{
        backgroundColor: 'rgba(128, 128, 128, 0.5)',
        height: '100%',
        maxWidth: '100%!important',
        zIndex: 1800,
        position: 'fixed',
        margin: 'auto',
        top: 0,
        left: 0,
      }}>
      <AnimatedText text="We collect your order" />
    </Container>
  ) : (
    <StyledModal ref={modalRef} open={modal} onClose={closed}>
      <StyledModalContainer>
        <Container
          component="div"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <StyledTypography component="h5" variant="h5">
            Ordered
          </StyledTypography>
          <StyledIconButton onClick={closed}>
            <Close />
          </StyledIconButton>
        </Container>
        <StyledTypography component="p" variant="body1">
          {textModal}
        </StyledTypography>
        <StyledButton
          variant="contained"
          color="primary"
          role="button"
          disableElevation
          style={{ width: '80' }}
          onClick={closed}>
          Ok
        </StyledButton>
      </StyledModalContainer>
    </StyledModal>
  );
}
