import { styled } from '@mui/system';
import { Button } from '@mui/material';

export const RadiusButton = styled(Button)(({ theme }) => ({
  borderRadius: '10px',
  border: 'none',
  padding: '0',
  color: 'white',
  backgroundColor: theme.palette.primary.main,
  fontFamily: theme.typography.fontFamily.secondary,
  fontWeight: '400',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
}));

export const SquareButton = styled(Button)(({ theme }) => ({
  borderRadius: '0',
  border: 'none',
  padding: '0',
  color: 'white',
  backgroundColor: theme.palette.primary.main,
  fontFamily: theme.typography.fontFamily.secondary,
  fontWeight: '400',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
}));
