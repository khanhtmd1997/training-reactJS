import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";

const Navbar = styled(AppBar)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  backgroundColor: "#2f6077",
}));

const NavbarLink = styled(Button)(({ theme }) => ({
  marginRight: theme.spacing(2),
  color: "white",
  textDecoration: "none",
}));

const NavbarComponent = () => {
  return (
    <Navbar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: "white" }}
        >
          Mua điện thoại ở đây
        </Typography>
        <NavbarLink component={Link} to="/">
          Home
        </NavbarLink>
        <NavbarLink component={Link} to="/cart">
          Cart
        </NavbarLink>
        <NavbarLink component={Link} to="/products">
          Product
        </NavbarLink>
        <NavbarLink component={Link} to="/register">
          Register
        </NavbarLink>
        <NavbarLink component={Link} to="/login">
          Login
        </NavbarLink>
      </Toolbar>
    </Navbar>
  );
};

export default NavbarComponent;
