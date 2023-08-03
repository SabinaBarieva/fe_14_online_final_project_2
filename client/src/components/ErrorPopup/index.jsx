import React, { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useSelector, useDispatch } from 'react-redux';
import { removeErrorMessage } from '../../redux/slices/errorsSlice';

function ErrorPopup() {
  const errorMessages = useSelector((state) => state.errors.errors);
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(removeErrorMessage());
    }, 5000);
  });

  return (
    <Stack
      sx={{
        width: '80%',
        position: 'absolute',
        bottom: '10px',
        left: 0,
        right: 0,
        zIndex: 100,
        margin: 'auto',
      }}
      spacing={2}>
      {errorMessages.map((message) => (
        <Alert
          key={message}
          sx={{ border: '1px solid black' }}
          severity="warning">
          {message}
        </Alert>
      ))}
    </Stack>
  );
}
export default ErrorPopup;
