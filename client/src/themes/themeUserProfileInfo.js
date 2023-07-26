import { styled } from '@mui/system';
import { Box, Button } from '@mui/material';

export const DataBoxes = styled(Box)(() => ({
  padding: '4px 8px',
  display: 'flex',
  justifyContent: 'space-between',
  border: '1px solid rgba(161, 161, 161, 1)',
  borderRadius: '7px',
  marginBottom: '16px',
}));

export const DataBoxesBorder = styled(Box)(() => ({
  padding: '0 4px',
  width: '100%',
  borderBottom: '1px solid rgb(171, 169, 169)',
  display: 'flex',
  justifyContent: 'space-between',
}));
export const BoxTitle = styled(Box)(() => ({
  fontSize: '1.1rem',
  borderRadius: '15px',
  padding: '3px 8px',
  color: '#fff',
  backgroundColor: 'rgb(43, 46, 53)',
  margin: '4px 0 3px 0',
}));
export const BoxUserData = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'end',
  fontSize: '1.4rem',
  color: 'rgb(43, 46, 53)',
}));

export const Buttons = styled(Button)(() => ({
  padding: '9px 18px',
  backgroundColor: '#211F1C',
  color: '#fff',
  borderRadius: '7px',
  border: '1px solid #211F1C',
  '&:hover': {
    backgroundColor: '#fff',
    color: '#211F1C',
    border: '1px solid #211F1C',
  },
}));
