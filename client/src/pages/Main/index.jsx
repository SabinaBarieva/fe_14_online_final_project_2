import React from 'react';
import { Link } from 'react-router-dom';

function MainContent() {
  return (
    <>
      <Link to={`/product/${123}`}>current product</Link>
      <div>Main Content</div>
    </>
  );
}
export default MainContent;
