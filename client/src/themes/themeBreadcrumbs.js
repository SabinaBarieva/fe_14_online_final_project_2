import { Breadcrumbs } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import { Link as RouterLink } from 'react-router-dom';

const animationLoading = keyframes`
0% {
    width: 0;
  }
  100% {
    width: 100%;
  }`;

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  padding: '20px 10px',
  margin: '140px 100px 50px',
  minHeight: 75,
  height: 'auto',
  fontSize: '1.5rem',
  borderRadius: 10,

  boxShadow: `0px 10px 20px -10px ${theme.palette.primary.main}`,
  '& .MuiBreadcrumbs-ol': {
    flexWrap: 'nowrap',
  },
  '& .MuiBreadcrumbs-li:last-child': {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  '& .breadcrumbSpan': {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  [theme.breakpoints.between('sm', 'lg')]: {
    margin: '40px 50px',
    padding: 20,
  },
  [theme.breakpoints.between('xs', 'sm')]: {
    borderRadius: 0,
    minHeight: 50,
    height: 'auto',
    margin: '30px 10px',
    padding: 10,
    fontSize: '1.2rem',
  },
}));

const StyledRouterLink = styled(RouterLink)(({ theme }) => ({
  color: theme.palette.primary.light,
  padding: 10,
  textDecoration: 'none',
  [theme.breakpoints.between('xs', 'sm')]: {
    padding: 0,
  },
}));

const StyledSpan = styled('span')(({ theme }) => ({
  color: theme.palette.primary.light,
  fontWeight: theme.typography.const.fontWeight.bold,
  padding: 10,
  maxWidth: '80%',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  [theme.breakpoints.between('xs', 'sm')]: {
    padding: 0,
  },
  '&.loading': {
    textOverflow: 'clip',
    display: 'block',
    animation: `${animationLoading} 2s linear infinite forwards`,
  },
}));

export { StyledBreadcrumbs, StyledRouterLink, StyledSpan };
