import { NavLink } from "react-router-dom";
const CatsAndFilters = () => {
  return (
    <>
      <NavLink to="/home">main content</NavLink>
      <NavLink to="/product">product</NavLink>
      {/* <NavLink to="/categories">Categories and filters</NavLink> */}
      <NavLink to="/basket">basket content</NavLink>
      <div>Categories And Filters Content</div>{" "}
    </>
  );
};
export default CatsAndFilters;
