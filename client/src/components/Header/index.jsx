import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Footer from '../Footer';
import BreadCrumbs from '../Breadcrumbs';
import Search from '../Search';

function Header() {
  return (
    <>
      <header>
        <NavLink to="/">LOGO</NavLink>
        <Search />
        <NavLink to="/basket">basket content</NavLink>
      </header>
      <BreadCrumbs />
      <Outlet />
      <Footer />
    </>
  );
}

export default Header;
