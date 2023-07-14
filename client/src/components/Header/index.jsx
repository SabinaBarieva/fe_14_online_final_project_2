import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, NavLink } from 'react-router-dom';
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

const activeLinkDecoration = ({ isActive }) => ({
  color: '#5E5E5E',
  textAlign: 'center',
  fontFamily: 'Roboto',
  fontSize: '16px',
  fontStyle: 'normal',
  textDecoration: isActive ? 'underline' : 'none',
  textUnderlinePosition: isActive ? 'under' : 'none',
  fontWeight: isActive ? '700' : '400',
  cursor: isActive ? 'default' : 'pointer',
  width: isActive ? '65px' : '',
  height: isActive ? '22px' : '',
});

function Header() {
  const { itemsBasket } = useSelector(selectCart);
  const [totalInBasket, setTotalInBasket] = useState(0);
  const [open, setOpen] = useState(false);

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
        }}>
        <Container maxWidth="100%" style={{ padding: '0' }}>
          <Toolbar
            sx={{
              justifyContent: 'space-between',
              padding: {
                xs: '0 0 0 1.25rem',
                md: '0 0 0 3.44rem',
                lg: '2.75rem 4.81rem 1.94rem 6.5rem',
              },
            }}>
            <NavLink to="/" style={{ textDecoration: 'none' }}>
              <Grid container direction="row">
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
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
                <Stack
                  sx={{
                    width: { xs: '1.7rem', md: '2.0rem' },
                    height: { xs: '1.7rem', md: '2.0rem' },
                  }}>
                  <AdvancedImage
                    cldImg={getImg.image('header/frfdurnw7br9n8gxqfdy.png')}
                    alt="twitter"
                    width="100%"
                  />
                </Stack>
              </Grid>
            </NavLink>
            <Hidden lgDown>
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
              <Search />
              <NavLink to="/basket">
                <IconButton>
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
                sx={{ background: '#211F1C', width: '113px', height: '40px' }}>
                Login
              </Button>
            </Hidden>
            <Hidden lgUp>
              <IconButton
                style={{ padding: '0' }}
                onClick={() => setOpen(true)}>
                <MenuIcon
                  sx={{
                    backgroundColor: '#393D45',
                    color: '#F4F4F4',
                    width: '100%',
                    height: '100%',
                    maxWidth: { xs: '52px', md: '114px' },
                    maxHeight: { xs: '52px', md: '109px' },
                  }}
                />
              </IconButton>
            </Hidden>
          </Toolbar>
        </Container>
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
              <IconButton onClick={() => setOpen(false)}>
                <CloseIcon />
              </IconButton>
            </div>
            <NavLink to="/basket">
              <IconButton>
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
              sx={{ background: '#211F1C', width: '113px', height: '40px' }}>
              Login
            </Button>
          </Grid>
          <Divider />
          <List>
            <ListItem sx={{ justifyContent: 'center' }}>
              <Search />
            </ListItem>
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
          </List>
        </SwipeableDrawer>
      </AppBar>
      <BreadCrumbs />
      <Outlet />
      <Footer />
    </AllContent>
  );
}

export default Header;
