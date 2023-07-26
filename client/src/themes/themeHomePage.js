import { styled } from '@mui/system';
import { Typography } from '@mui/material';
import { RadiusButton } from '../components/Buttons';

export const SectionTitle = styled(Typography)(({ theme }) => ({
  // fontFamily: theme.typography.const.fontFamily.primary,
  fontWeight: theme.typography.const.fontWeight.bold,
  letterSpacing: '0rem',
  color: theme.palette.primary,
  margin: '5% auto',
  [theme.breakpoints.between('xs', 'sm')]: {
    fontSize: '1.3rem',
  },
  [theme.breakpoints.between('sm', 'md')]: {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.between('md', 'lg')]: {
    fontSize: '1.9rem',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '2.3rem',
  },
}));
export const AllProductsBtn = styled(RadiusButton)(() => ({
  minWidth: '128px',
  minHeight: '32px',
  maxWidth: '218px',
  maxHeight: '54px',
}));
