import { Breadcrumbs } from '@mui/material';
import { styled } from '@mui/system';
import { Link as RouterLink } from 'react-router-dom';

const StyledBreadcrumbs = styled(Breadcrumbs)({
  padding: '20px 10px',
  margin: '50px 100px',
  minHeight: 75,
  height: 'auto',
  fontSize: '1.5rem',
  borderRadius: 10,
  boxShadow: '0px 10px 20px -10px #42445a',
  '@media (max-width: 768px)': {
    margin: '40px 50px',
    padding: 20,
  },
  '@media (max-width: 320px)': {
    borderRadius: 0,
    minHeight: 50,
    height: 'auto',
    margin: '30px 10px',
    padding: 10,
    fontSize: '1.2rem',
  },
});

const StyledRouterLink = styled(RouterLink)({
  color: '#616467',
  padding: 10,
  textDecoration: 'none',
  '@media (max-width: 320px)': {
    padding: 0,
  },
});

const StyledSpan = styled('span')({
  fontWeight: 'bold',
  padding: 10,
  '@media (max-width: 320px)': {
    padding: 0,
  },
});

export { StyledBreadcrumbs, StyledRouterLink, StyledSpan };
