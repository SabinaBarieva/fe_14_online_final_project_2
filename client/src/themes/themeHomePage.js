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
    fontSize: '2rem',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '3.2rem',
  },
}));
export const AllProductsBtn = styled(RadiusButton)(({ theme }) => ({
  width: '9rem',
  height: '2.3rem',
  fontSize: '0.8rem',
  [theme.breakpoints.between('xs', 'sm')]: {
    width: '9rem',
    height: '2.3rem',
    fontSize: '0.8rem',
  },
  [theme.breakpoints.between('sm', 'md')]: {
    width: '9rem',
    height: '2.3rem',
    fontSize: '1.3rem',
  },
  [theme.breakpoints.between('md', 'lg')]: {
    width: '12.8rem',
    height: '3.3rem',
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('lg')]: {
    width: '15.6rem',
    height: '3.9rem',
    fontSize: '1.8rem',
  },
}));
