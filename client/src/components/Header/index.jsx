import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Footer from '../Footer';
import BreadCrumbs from '../Breadcrumbs';

function Header() {
  return (
    <>
      <header>
        <NavLink to="/">LOGO</NavLink>
        <input type="text" />
        <NavLink to="/basket">basket content</NavLink>
      </header>
      <BreadCrumbs />
      <Outlet />
      <Footer />
    </>
  );
}

export default Header;
