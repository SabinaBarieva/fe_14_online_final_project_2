import React from 'react';
import { Link } from 'react-router-dom';

function MainContent() {
  // const id = useSelector() id товара
  const id = 123;
  return (
    <>
      <Link to={`home/product/${id}`}>Look this product</Link>
      <div>Main Content</div>
    </>
  );
}
export default MainContent;