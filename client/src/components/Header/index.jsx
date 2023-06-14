import { NavLink, Outlet } from "react-router-dom";
import Footer from "../Footer";
function Header() {
  return (
    <>
      <header>
        <NavLink to="/home">main content</NavLink>
        <NavLink to="/product">product</NavLink>
        <NavLink to="/categories">Categories and filters</NavLink>
        <NavLink to="/basket">basket content</NavLink>
      </header>
      <Outlet />
      <Footer />
    </>
  );
}

export default Header;
