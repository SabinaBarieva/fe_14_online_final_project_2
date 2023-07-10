import React from 'react';
import { NavLink } from 'react-router-dom';

function CategoriesLine() {
  return (
    <navbar>
      <NavLink to="/products/iphones">iPhones</NavLink>
      <NavLink to="/products/airpods">AirPods</NavLink>
      <NavLink to="/products/watches">Watches</NavLink>
      <NavLink to="/products/macbooks">MacBooks</NavLink>
      <NavLink to="/products/accessories">Accessories</NavLink>
    </navbar>
  );
}

export default CategoriesLine;
