import { styled } from '@mui/system';
import { CardContent, Typography } from '@mui/material';
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
    fontSize: '1rem',
    width: '6.7rem',
    height: '2rem',
  },
  [theme.breakpoints.between('md', 'lg')]: {
    fontSize: '1rem',
    width: '6.7rem',
    height: '2rem',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '1rem',
    width: '8rem',
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
    width: '3rem',
    height: '2rem',
    '& svg': {
      width: '1.3rem',
      height: '1.4rem',
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

export const CardInfo = styled(CardContent)(({ theme }) => ({
  color: theme.palette.primary.light,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  padding: '0',
  paddingLeft: '7px',
  paddingRight: '7px',
  marginTop: '5%',
  '&:last-child': {
    paddingBottom: '0',
  },
}));

export const ProductInfo = styled(Typography)(({ theme }) => ({
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  [theme.breakpoints.between('xs', 'sm')]: {
    fontSize: '.7rem',
    marginBottom: '2%',
  },
  [theme.breakpoints.between('sm', 'md')]: {
    fontSize: '.9rem',
  },
  [theme.breakpoints.between('md', 'lg')]: {
    fontSize: '1rem',
  },
  [theme.breakpoints.up('xl')]: {
    fontSize: '1rem',
  },
}));
