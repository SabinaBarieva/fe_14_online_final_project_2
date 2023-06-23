import React from 'react';
import { NavLink } from 'react-router-dom';

function MainContent() {
  return (
    <>
      <NavLink to="/basket">basket content</NavLink>
      <div>Main Content</div>
    </>
  );
}
export default MainContent;
