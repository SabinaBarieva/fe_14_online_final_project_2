import { styled } from '@mui/system';
import { Grid } from '@mui/material';

const StyledGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  height: 'auto',
  [theme.breakpoints.between('xs', 'md')]: {
    '&:nth-of-type(n+5)': {
      display: 'none',
    },
  },
  [theme.breakpoints.between('md', 'lg')]: {
    '&:nth-of-type(n+7)': {
      display: 'none',
    },
  },
  [theme.breakpoints.up('lg')]: {
    '&:nth-of-type(n+9)': {
      display: 'none',
    },
  },
}));

export default StyledGrid;
