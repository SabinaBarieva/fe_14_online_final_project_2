import { styled } from '@mui/system';
import {
  Button,
  FormControl,
  IconButton,
  InputBase,
  Grid,
  Typography,
  Modal,
  Container,
} from '@mui/material';

export const Title = styled('div')({
  fontWeight: '400',
  fontSize: '40px',
  lineHeight: '47px',
  color: '#616467',
});
export const Description = styled('div')({
  fontWeight: '400',
  fontSize: '18px',
  letterSpacing: '0.015em',
  color: '#9A9292',
  margin: '15px 0',
});
export const Price = styled('div')({
  fontWeight: '500',
  fontSize: '20px',
  lineHeight: '132%',
  letterSpacing: '0.015em',
  color: '#434343',
});
export const CountBoxes = styled('button')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '46px',
  height: '46px',
  background: '#F5F7FB',
  border: '0',
  '&:hover': {
    cursor: 'pointer',
    color: '#F5F7FB',
    backgroundColor: '#211F1C',
  },
});

export const CountInput = styled('input')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  width: '46px',
  height: '46px',
  background: '#F5F7FB',
  border: '0',
  '&::-webkit-outer-spin-button': {
    WebkitAppearance: 'none',
    margin: 0,
  },
  '&::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
    margin: 0,
  },
});
export const Guarantee = styled('div')({
  textAlign: 'right',
  fontWeight: '400',
  fontSize: '18px',
  letterSpacing: '0.015em',
  color: '#9A9292',
  margin: '15px 0',
  paddingRight: '20px',
});
