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
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import getImg from '../../cloudinary';
import Footer from '../Footer';
import BreadCrumbs from '../Breadcrumbs';
import Search from '../Search';
import { selectCart } from '../../redux/selectors';
import AllContent from '../../themes/themeMain';

function Header() {
  const { itemsBasket } = useSelector(selectCart);
  const [totalInBasket, setTotalInBasket] = useState(0);

  const totalBasketItems = () => {
    const total = itemsBasket.reduce((sum, item) => item.count + sum, 0);
    setTotalInBasket(total);
  };
  useEffect(() => {
    totalBasketItems();
  });
  return (
    <AllContent>
      <AppBar
        position="sticky"
        color="default"
        sx={{
          padding: {
            xs: '0 0 0 1.25rem',
            md: '0 0.01rem 0.19rem 3.44rem',
            lg: '2.81rem 4.81rem 1.94rem 6.5rem',
          },
        }}>
        <Container maxWidth="100%">
          <Toolbar>
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
            <Hidden mdDown>
              <Search />
              <NavLink to="/basket">
                <Grid container direction="row">
                  <ShoppingCartIcon />
                  <Typography>
                    {totalInBasket === 0 ? null : totalInBasket}
                  </Typography>
                </Grid>
              </NavLink>
            </Hidden>
            <Hidden mdUp>
              <MenuIcon />
            </Hidden>
          </Toolbar>
        </Container>
      </AppBar>
      <BreadCrumbs />
      <Outlet />
      <Footer />
    </AllContent>
  );
}

export default Header;
