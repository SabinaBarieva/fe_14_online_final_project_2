import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { AdvancedImage } from '@cloudinary/react';
import {
  Typography,
  Stack,
  Grid,
  AppBar,
  Toolbar,
  Container,
  Hidden,
  IconButton,
  SwipeableDrawer,
  Divider,
  List,
  ListItem,
  CssBaseline,
  Badge,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { styled } from '@mui/material/styles';
import getImg from '../../cloudinary';
import Footer from '../Footer';
import BreadCrumbs from '../Breadcrumbs';
import Search from '../Search';
import { selectCart } from '../../redux/selectors';
import AllContent from '../../themes/themeMain';
import { resetFilters } from '../../redux/slices/filtersSlice';

const activeLinkDecoration = ({ isActive }) => ({
  color: '#5E5E5E',
  textAlign: 'center',
  fontFamily: 'Roboto',
  fontSize: '16px',
  fontStyle: 'normal',
  textDecoration: isActive ? 'underline' : 'none',
  textUnderlinePosition: isActive ? 'under' : 'none',
  fontWeight: isActive ? '900' : '400',
  cursor: isActive ? 'default' : 'pointer',
});

function Header() {
  const { itemsBasket } = useSelector(selectCart);
  const [totalInBasket, setTotalInBasket] = useState(0);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  if (location.pathname !== '/product') {
    dispatch(resetFilters());
  }

  // eslint-disable-next-line no-unused-vars
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: 3,
      top: 4,
      border: `none`,
      padding: '0',
      color: '#F5F7FB',
      backgroundColor: '#FF6565',
      fontFamily: 'Josefin Sans',
      fontSize: '10px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: 'normal',
      minWidth: '12.5px',
      height: '12.1px',
    },
  }));

  const totalBasketItems = () => {
    const total = itemsBasket.reduce((sum, item) => item.count + sum, 0);
    setTotalInBasket(total);
  };
  useEffect(() => {
    totalBasketItems();
  });
  return (
    <AllContent>
      <CssBaseline />
      <AppBar
        position="sticky"
        sx={{
          background: '#F8F8F8',
          boxShadow: 'none',
          padding: '0',
          margin: '0',
        }}>
        <Container maxWidth="100%" style={{ padding: '0' }}>
          <Toolbar
            sx={{
              justifyContent: 'space-between',
              padding: {
                xs: '0 0 0 1.25rem',
                md: '0 0 0 3.44rem',
                lg: '2rem',
              },
            }}>
            <NavLink to="/" style={{ textDecoration: 'none' }}>
              <Grid container direction="row">
                <Stack
                  sx={{
                    width: { xs: '1.7rem', md: '2.0rem' },
                    height: { xs: '1.7rem', md: '2.0rem' },
                    margin: '4px 2px 0 0',
                  }}>
                  <AdvancedImage
                    cldImg={getImg.image('header/frfdurnw7br9n8gxqfdy.png')}
                    alt="twitter"
                    width="100%"
                  />
                </Stack>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    margin: '0',
                    padding: '0',
                    color: '#616467',
                    fontFamily: 'Lato',
                    fontStyle: 'normal',
                    fontWeight: '500',
                    lineHeight: 'normal',
                    fontSize: {
                      xs: '25px',
                      md: '30px',
                    },
                  }}>
                  Apple Shop
                </Typography>
              </Grid>
            </NavLink>
            <Hidden only={['xs', 'sm', 'md']}>
              <NavLink
                to="/"
                style={activeLinkDecoration}
                className="header_link">
                Home
              </NavLink>
              <Typography
                sx={{
                  color: '#393D45',
                  fontFamily: 'Roboto',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: 'normal',
                }}>
                /
              </Typography>
              <NavLink
                to="/product"
                style={activeLinkDecoration}
                className="header_link">
                Product
              </NavLink>
              <Typography
                sx={{
                  color: '#393D45',
                  fontFamily: 'Roboto',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: 'normal',
                }}>
                /
              </Typography>
              <NavLink
                to="/about"
                style={activeLinkDecoration}
                className="header_link">
                About
              </NavLink>
              <Container
                style={{
                  maxWidth: '300px',
                  padding: '0',
                  margin: '0',
                }}>
                <Search />
              </Container>
              <NavLink to="/basket">
                <IconButton style={{ padding: '0', margin: '0' }}>
                  <StyledBadge
                    badgeContent={totalInBasket === 0 ? '0' : totalInBasket}>
                    <ShoppingCartOutlinedIcon
                      sx={{
                        color: '#616467',
                        width: '28.7px',
                        height: '32px ',
                      }}
                    />
                  </StyledBadge>
                </IconButton>
              </NavLink>
              <Button
                variant="contained"
                endIcon={<LoginOutlinedIcon />}
                sx={{
                  background: '#211F1C',
                  width: '113px',
                  height: '40px',
                  padding: '0',
                  margin: '0',
                }}>
                Login
              </Button>
            </Hidden>
            <Hidden only={['lg', 'xl', 'xxl']}>
              <IconButton
                style={{ padding: '0' }}
                onClick={() => setOpen(true)}>
                <MenuIcon
                  sx={{
                    backgroundColor: '#F4F4F4',
                    color: '#393D45',
                    width: '100%',
                    height: '100%',
                    maxWidth: { xs: '50px', md: '75px' },
                    maxHeight: { xs: '50px', md: '75px' },
                  }}
                />
              </IconButton>
            </Hidden>
          </Toolbar>
        </Container>
        <Hidden only={['lg', 'xl', 'xxl']}>
          <SwipeableDrawer
            anchor="top"
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ padding: '0.5rem' }}>
              <div>
                <IconButton>
                  <CloseIcon onClick={() => setOpen(false)} />
                </IconButton>
              </div>
              <NavLink to="/basket" onClick={() => setOpen(false)}>
                <IconButton style={{ padding: '0', margin: '0' }}>
                  <StyledBadge
                    badgeContent={totalInBasket === 0 ? '0' : totalInBasket}>
                    <ShoppingCartOutlinedIcon
                      sx={{
                        color: '#616467',
                        width: '28.7px',
                        height: '32px ',
                      }}
                    />
                  </StyledBadge>
                </IconButton>
              </NavLink>
              <Button
                variant="contained"
                endIcon={<LoginOutlinedIcon />}
                sx={{
                  background: '#211F1C',
                  width: '113px',
                  height: '40px',
                  margin: '0',
                  padding: '0',
                }}
                onClick={() => setOpen(false)}>
                Login
              </Button>
            </Grid>
            <Divider />
            <List style={{ height: '100vh' }}>
              <ListItem
                sx={{ justifyContent: 'center' }}
                onClick={() => setOpen(false)}>
                <NavLink
                  to="/"
                  style={activeLinkDecoration}
                  className="header_link">
                  Home
                </NavLink>
              </ListItem>
              <ListItem
                sx={{ justifyContent: 'center' }}
                onClick={() => setOpen(false)}>
                <NavLink
                  to="/product"
                  style={activeLinkDecoration}
                  className="header_link">
                  Product
                </NavLink>
              </ListItem>
              <ListItem
                sx={{ justifyContent: 'center' }}
                onClick={() => setOpen(false)}>
                <NavLink
                  to="/about"
                  style={activeLinkDecoration}
                  className="header_link">
                  About
                </NavLink>
              </ListItem>
              <ListItem sx={{ justifyContent: 'center' }}>
                <Search />
              </ListItem>
            </List>
          </SwipeableDrawer>
        </Hidden>
      </AppBar>
      <BreadCrumbs />
      <Outlet />
      <Footer />
    </AllContent>
  );
}

export default Header;
