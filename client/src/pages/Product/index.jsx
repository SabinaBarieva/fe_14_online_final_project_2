import { NavLink } from "react-router-dom";
const ProductContent = () => {
  return (
    <>
      <NavLink to="/home">main content</NavLink>
      {/* <NavLink to="/product">product</NavLink> */}
      <NavLink to="/categories">Categories and filters</NavLink>
      <NavLink to="/basket">basket content</NavLink>
      <div>Product Content</div>{" "}
    </>
  );
};
export default ProductContent;
