import { styled } from '@mui/system';
import { Card, CardContent, Typography } from '@mui/material';
import { RadiusButton } from '../components/Buttons';

export const DetailButton = styled(RadiusButton)(({ theme }) => ({
  lineHeight: '0.8rem',
  fontSize: '0.7rem',
  minWidth: '4.5rem',
  fontWeight: theme.typography.const.fontWeight.normal,
  fontFamily: theme.typography.const.fontFamily.secondary,
  [theme.breakpoints.between('xs', 'sm')]: {
    textTransform: 'capitalize',
    width: '4.5rem',
    height: '1.3rem',
  },
  [theme.breakpoints.between('sm', 'md')]: {
    width: '5rem',
    height: '1.5rem',
  },
  [theme.breakpoints.between('md', 'lg')]: {
    fontSize: '1rem',
    width: '7.5rem',
    height: '2rem',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '1rem',
    width: '8.5rem',
    height: '2.5rem',
  },
}));

export const AddToCartBtn = styled(RadiusButton)(({ theme }) => ({
  backgroundColor: 'white',
  outline: `1px solid ${theme.palette.primary.buttonhover}`,
  position: 'relative',
  minWidth: '1.8rem',
  '&:hover': {
    backgroundColor: theme.palette.primary.buttonhover,
    outline: `1px solid transparent`,
  },
  '& svg': {
    marginTop: '5%',
  },
  [theme.breakpoints.between('xs', 'sm')]: {
    width: '1.8rem',
    height: '1.3rem',
    '& svg': {
      width: '1rem',
      height: '0.85rem',
    },
  },
  [theme.breakpoints.between('sm', 'md')]: {
    width: '1.9rem',
    height: '1.5rem',
    '& svg': {
      width: '1.3rem',
      height: '1.5rem',
    },
  },
  [theme.breakpoints.between('md', 'lg')]: {
    width: '3rem',
    height: '2rem',
    '& svg': {
      width: '1.3rem',
      height: '1.4rem',
    },
  },
  [theme.breakpoints.up('lg')]: {
    width: '2.5rem',
    height: '2.5rem',
    '& svg': {
      width: '1.4rem',
      height: '1.4rem',
    },
  },
}));

export const Label = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.dark,
  fontSize: '0.625rem',
  lineHeight: '0.75rem',
}));

export const CardInfo = styled(CardContent)(({ theme }) => ({
  color: theme.palette.primary.light,
  //   fontFamily: theme.typography.const.fontFamily.secondary,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  padding: '0',
  paddingLeft: '8%',
  marginTop: '3%',
  width: '93%',
  [theme.breakpoints.between('xs', 'sm')]: {
    display: 'block',
    textAlign: 'left',
    paddingLeft: '5%',
  },
  '&:last-child': {
    paddingBottom: '0',
  },
}));

export const ProductName = styled(Typography)(({ theme }) => ({
  fontWeight: '700',
  width: '70%',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  [theme.breakpoints.between('xs', 'sm')]: {
    fontSize: '.9rem',
    lineHeight: '1rem',
    marginBottom: '2%',
  },
  [theme.breakpoints.up('xl')]: {
    fontSize: '.875rem',
    lineHeight: '1rem',
  },
}));

export const ProductPrice = styled(Typography)(() => ({
  // fontWeight: '400',
  fontSize: '.875rem',
  lineHeight: '1rem',
}));
