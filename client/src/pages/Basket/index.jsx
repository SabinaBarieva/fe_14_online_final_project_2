import { NavLink } from "react-router-dom";
const BasketContent = () => {
  return (
    <>
      <NavLink to="/home">main content</NavLink>
      <NavLink to="/product">product</NavLink>
      <NavLink to="/categories">Categories and filters</NavLink>
      {/* <NavLink to="/basket">basket content</NavLink> */}
      <div>Basket Content</div>{" "}
    </>
  );
};
export default BasketContent;
