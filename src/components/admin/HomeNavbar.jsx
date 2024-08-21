import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.user.currentUser);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
              <NavbarButton component={Link} to="/orders" color="inherit">
                <Typography variant="h6">Ordini</Typography>
              </NavbarButton>
              <NavbarButton component={Link} to="/tables" color="inherit">
                <Typography variant="h6">Tavoli</Typography>
              </NavbarButton>
              <NavbarButton component={Link} to="/products" color="inherit">
                <Typography variant="h6">Prodotti</Typography>
              </NavbarButton>
              <NavbarButton component={Link} to="/orderdetail" color="inherit">
                <Typography variant="h6">Dettagli ordini</Typography>
              </NavbarButton>
              <NavbarButton>
                <MoreVert id="menu-button" onClick={handleClick} />
              </NavbarButton>
            </Box>
          </Toolbar>
        </Container>
      </StyledAppBar>
      <StyledMenu
        id="menu-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        // elevation={0}
        keepMounted
      >
        <MenuList>
          <MenuItem component={Link} to="/profile" onClick={handleClose}>
            <ListItemText>Profilo</ListItemText>
          </MenuItem>
          {currentUser && currentUser.role === "ADMIN" && (
            <MenuItem component={Link} to="/users" onClick={handleClose}>
              <ListItemText>Visualizza STAFF</ListItemText>
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
