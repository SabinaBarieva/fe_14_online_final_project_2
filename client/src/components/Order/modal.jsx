import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Modal,
  Container,
  Typography,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { closeModal } from '../../redux/slices/modalSlice';
import { openApp } from '../../redux/slices/formSlice';

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
    <Modal ref={modalRef} open={modal} onClose={closed}>
      <Container>
        <Container
          component="div"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Typography component="h5" variant="h5">
            {textHeader}
          </Typography>
          <IconButton onClick={closed}>
            <Close />
          </IconButton>
        </Container>
        <Typography component="p" variant="body1">
          {textModal}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={closed}>
          Ok
        </Button>
      </Container>
    </Modal>
  );
}
