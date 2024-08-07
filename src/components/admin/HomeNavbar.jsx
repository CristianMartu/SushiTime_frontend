import { useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

const HomeNavbar = () => {
  const key = import.meta.env.VITE_PASSWORD;
  const password = localStorage.getItem("adminPassword");

  const navigate = useNavigate();

  useEffect(() => {
    if (key !== password) {
      navigate("/menu");
    }
  }, []);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={NavLink} to={"/"}>
          SushiTime
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <NavLink to={"/"} className="nav-link">
              Ordini
            </NavLink>
            <NavLink to={"/tables"} className="nav-link">
              Tavoli
            </NavLink>
            <NavLink to={"/products"} className="nav-link">
              Prodotti
            </NavLink>
            <NavLink to={"/orderDetail"} className="nav-link">
              Dettagli ordini
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default HomeNavbar;
