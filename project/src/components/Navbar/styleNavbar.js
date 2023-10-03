import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "link active" : "link")}
      >
        Home
      </NavLink>
      <NavLink
        to="/register"
        className={({ isActive }) => (isActive ? "link active" : "link")}
      >
        Register
      </NavLink>
      <NavLink
        to="/login"
        className={({ isActive }) => (isActive ? "link active" : "link")}
      >
        Login
      </NavLink>
      <NavLink
        to="/product"
        className={({ isActive }) => (isActive ? "link active" : "link")}
      >
        Products
      </NavLink>
    </nav>
  );
};
export default Navbar;
