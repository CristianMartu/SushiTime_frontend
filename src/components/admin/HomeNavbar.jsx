import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  Box,
  Container,
  Divider,
  ListItemText,
  MenuItem,
  MenuList,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";

import { NavbarButton, StyledAppBar, StyledMenu } from "./../../style/style";
import logo from "./../../assets/logo.png";
import { MoreVert } from "@mui/icons-material";

const MyNavbar = () => {
  const key = import.meta.env.VITE_PASSWORD;
  const password = localStorage.getItem("adminPassword");
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.user.currentUser);

  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  // const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  useEffect(() => {
    if (key !== password) {
      navigate("/menu");
    }
  }, [key, navigate, password]);

  return (
    <>
      <StyledAppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "4rem",
            }}
          >
            <img src={logo} alt="logo" style={{ maxHeight: "3.5rem" }} />
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <NavbarButton
                component={Link}
                to="/orders"
                color="inherit"
                active={location.pathname === "/orders"}
              >
                <Typography variant="h6">Ordini</Typography>
              </NavbarButton>
              <NavbarButton
                component={Link}
                to="/tables"
                color="inherit"
                active={location.pathname === "/tables"}
              >
                <Typography variant="h6">Tavoli</Typography>
              </NavbarButton>
              <NavbarButton
                component={Link}
                to="/products"
                color="inherit"
                active={location.pathname === "/products"}
              >
                <Typography variant="h6">Prodotti</Typography>
              </NavbarButton>
              <NavbarButton
                component={Link}
                to="/orderdetail"
                color="inherit"
                active={location.pathname === "/orderdetail"}
              >
                <Typography variant="h6">Dettagli ordini</Typography>
              </NavbarButton>
              <NavbarButton
                active={
                  location.pathname === "/profile" ||
                  location.pathname === "/users"
                }
              >
                <MoreVert
                  id="menu-button"
                  onClick={handleClick}
                  onMouseOver={handleClick}
                />
              </NavbarButton>
            </Box>
          </Toolbar>
        </Container>
      </StyledAppBar>
      <StyledMenu
        id="menu-button"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        MenuListProps={{ onMouseLeave: handleClose }}
        // elevation={0}
        keepMounted
      >
        <MenuList>
          <MenuItem component={Link} to="/profile" onClick={handleClose}>
            <ListItemText
              sx={{
                color:
                  location.pathname === "/profile" &&
                  theme.palette.secondary.main,
              }}
            >
              Profilo
            </ListItemText>
          </MenuItem>
          {currentUser && currentUser.role === "ADMIN" && (
            <MenuItem component={Link} to="/users" onClick={handleClose}>
              <ListItemText
                sx={{
                  color:
                    location.pathname === "/users" &&
                    theme.palette.secondary.main,
                }}
              >
                Visualizza STAFF
              </ListItemText>
            </MenuItem>
          )}
          <Divider
            color={theme.palette.common.secondary}
            sx={{ height: "2px" }}
          />
          <MenuItem component={Link} to="/" onClick={handleClose}>
            <ListItemText>Esci</ListItemText>
          </MenuItem>
        </MenuList>
      </StyledMenu>
    </>
  );
};

export default MyNavbar;
