import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from '@mui/material';
import { Close } from '@mui/icons-material';
import { closeModal } from '../../redux/slices/modalSlice';
import { sendOrder } from '../../redux/slices/orderSlice';
import clearBasket from '../../redux/slices/basketSlice/clearBasket';
import {
  StyledTypography,
  StyledButton,
  StyledIconButton,
  StyledModal,
  StyledModalContainer,
} from '../../themes/themeOrder';

export default function ModalOrdered() {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal.statusModal);
  const textModal = useSelector((state) => state.modal.text);
  const textHeader = useSelector((state) => state.modal.statusOrder);
  const modalRef = useRef(null);

  const closed = () => {
    dispatch(closeModal());
    // dispatch(sendOrder());
    // dispatch(clearBasket());
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

  return (
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
            {textHeader}
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
          disableElevation
          style={{ width: '80' }}
          onClick={closed}>
          Ok
        </StyledButton>
      </StyledModalContainer>
    </StyledModal>
  );
}
