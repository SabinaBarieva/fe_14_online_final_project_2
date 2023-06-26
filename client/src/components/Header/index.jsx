import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Footer from '../Footer';

function Header() {
  return (
    <>
      <header>
        <NavLink to="/home">LOGO</NavLink>
        <input type="text" />
        <NavLink to="/basket">basket content</NavLink>
      </header>
      <Outlet />
      <Footer />
    </>
  );
}

export default Header;
