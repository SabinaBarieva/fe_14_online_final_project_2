import { styled } from '@mui/system';
import { Card, CardContent, Typography } from '@mui/material';
import { RadiusButton } from '../components/Buttons';

export const CardContainer = styled(Card)(() => ({
  outline: `solid 1px transparent`,
  borderRadius: '15px',
  marginBottom: '5%',
  height: '100%',
}));

export const DetailButton = styled(RadiusButton)(({ theme }) => ({
  fontSize: '0.625rem',
  lineHeight: '0.75rem',
  [theme.breakpoints.between('xs', 'sm')]: {
    textTransform: 'capitalize',
    width: '77px',
    height: '20px',
  },
  [theme.breakpoints.between('sm', 'md')]: {
    fontSize: '0.7rem',
    width: '100px',
    height: '30px',
  },
  [theme.breakpoints.between('md', 'lg')]: {
    fontSize: '0.75rem',
    minWidth: '104px',
    minHeight: '29px',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '0.785rem',
    minWidth: '104px',
    minHeight: '30px',
  },
}));

export const AddToCartBtn = styled(RadiusButton)(({ theme }) => ({
  backgroundColor: 'white',
  outline: `1px solid ${theme.palette.primary.buttonhover}`,
  width: '30%',
  height: '90%',
  maxWidth: '40px',
  maxHeight: '26px',
  position: 'relative',
  '&:hover': {
    backgroundColor: theme.palette.primary.buttonhover,
    outline: `1px solid transparent`,
  },
  '& svg': {
    marginTop: '5%',
    minWidth: '13px',
    minHeight: '12px',
    maxWidth: '18px',
    maxHeight: '20px',
  },

  [theme.breakpoints.between('xs', 'sm')]: {
    minWidth: '29px',
    minHeight: '20px',
    '& svg': {
      width: '17px',
      height: '16px',
    },
  },
  [theme.breakpoints.between('sm', 'md')]: {
    width: '36px',
    height: '30px',
    '& svg': {
      width: '18px',
      height: '20px',
    },
  },
  [theme.breakpoints.between('md', 'lg')]: {
    minWidth: '42px',
    minHeight: '29px',
    '& svg': {
      width: '18px',
      height: '20px',
    },
  },
  [theme.breakpoints.up('lg')]: {
    minWidth: '40px',
    minHeight: '30px',
    '& svg': {
      width: '17px',
      height: '20px',
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
