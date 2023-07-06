import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from '@mui/material';
import { Close } from '@mui/icons-material';
import { closeModal } from '../../redux/slices/modalSlice';
import { openApp } from '../../redux/slices/formSlice';
import {
  StyledTypography,
  StyledButton,
  StyledIconButton,
  StyledModal,
  StyledModalContainer,
} from '../../themes/themeOrder';

export default function ModalOrdered() {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.toolkitModal.statusModal);
  const textModal = useSelector((state) => state.toolkitModal.text);
  const textHeader = useSelector((state) => state.toolkitModal.statusOrder);
  const modalRef = useRef(null);

  const closed = () => {
    dispatch(openApp());
    dispatch(closeModal());
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
          onClick={closed}>
          Ok
        </StyledButton>
      </StyledModalContainer>
    </StyledModal>
  );
}
