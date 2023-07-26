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
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { styled } from '@mui/material/styles';
import getImg from '../../cloudinary';
import Footer from '../Footer';
import BreadCrumbs from '../Breadcrumbs';
import Search from '../Search';
import { selectCart, selectWishlist } from '../../redux/selectors';
import AllContent from '../../themes/themeMain';
import { resetFilters } from '../../redux/slices/filtersSlice';
import { burgerOpen, burgerClose } from '../../redux/slices/headerSlice';
import LoginButtons from '../Login/loginButtons';
import { getWishlist } from '../../redux/slices/wishlistSlice';

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

// eslint-disable-next-line no-unused-vars
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 3,
    top: 4,
    border: `none`,
    padding: '0',
    color: '#F5F7FB',
    backgroundColor: '#FF6565',
    fontFamily: 'Roboto',
    fontSize: '10px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal',
    minWidth: '12.5px',
    height: '12.1px',
  },
}));

function Header() {
  const [totalInBasket, setTotalInBasket] = useState('0');
  const { itemsBasket } = useSelector(selectCart);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const { itemsWishlist } = useSelector(selectWishlist);
  // const [totalInWishlist, setTotalInWishlist] = useState('0');

  const locationDispatch = () => {
    if (location.pathname !== '/product') {
      dispatch(resetFilters());
    }
  };

  const totalBasketItems = () => {
    const total = itemsBasket.reduce((sum, item) => item.count + sum, 0);
    setTotalInBasket(total);
  };

  // const totalWishlistItems = () => {
  //   const total = itemsWishlist.reduce((sum, item) => item.count + sum, 0);
  //   setTotalInWishlist(total);
  // };

  const openBurgerMenu = () => {
    if (open === true) {
      return dispatch(burgerOpen());
    }
    return dispatch(burgerClose());
  };

  useEffect(() => {
    totalBasketItems();
    locationDispatch();
    openBurgerMenu();
    dispatch(getWishlist());
    // totalWishlistItems();
  }, [itemsBasket, location, open, itemsWishlist]);

  return (
    <AllContent>
      <CssBaseline />
      <AppBar
        position="fixed"
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
                    margin: '1px 2px 0 0',
                  }}>
                  <AdvancedImage
                    cldImg={getImg.image('header/xgm2bpkdqqgg0qlzxh5l.png')}
                    alt="logo"
                    width="100%"
                  />
                </Stack>
                <Hidden mdDown>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                      margin: '0',
                      padding: '0',
                      color: '#616467',
                      fontFamily: 'Roboto',
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
                </Hidden>
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
            </Hidden>
            <Container
              style={{
                maxWidth: '300px',
                padding: '0',
                margin: '0',
              }}>
              <Search />
            </Container>
            <NavLink to="/user">USER PAGE TEST</NavLink>
            {itemsWishlist.length > 0 ? (
              <StyledBadge
                badgeContent={
                  itemsWishlist.length > 0 ? itemsWishlist.length : ''
                }>
                <FavoriteIcon
                  sx={{
                    color: 'black',
                  }}
                />
              </StyledBadge>
            ) : (
              <StyledBadge badgeContent={itemsWishlist.length === 0}>
                <FavoriteBorderIcon
                  sx={{
                    color: 'black',
                  }}
                />
              </StyledBadge>
            )}
            <NavLink to="/basket">
              <IconButton
                sx={{ padding: '0', margin: { xs: '0 5px', sm: '0' } }}>
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
            <LoginButtons />
            {/* <Hidden lgDown>
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
            </Hidden> */}
            <Hidden lgUp>
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
        {/* <SwipeableDrawer
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
          <List>
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
        </SwipeableDrawer> */}
      </AppBar>
      <BreadCrumbs />
      <Outlet />
      <Footer />
    </AllContent>
  );
}

export default Header;
