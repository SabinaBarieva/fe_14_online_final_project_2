import { Outlet } from "react-router-dom";
import Footer from "../Footer";
function Header() {
  return (
    <>
      <header>header</header>
      <Outlet />
      <Footer />
    </>
  );
}

export default Header;
