import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, NavLink } from 'react-router-dom';
import Footer from '../Footer';
import BreadCrumbs from '../Breadcrumbs';
import { selectCart } from '../../redux/selectors';

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
    <>
      <header>
        <NavLink to="/">LOGO</NavLink>
        <input type="text" />
        <NavLink to="/basket">basket content {totalInBasket}</NavLink>
      </header>
      <BreadCrumbs />
      <Outlet />
      <Footer />
    </>
  );
}

export default Header;
