import { useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { fetchCurrentUser } from "../../redux/actions";

const HomeNavbar = () => {
  const key = import.meta.env.VITE_PASSWORD;
  const password = localStorage.getItem("adminPassword");
  const accessToken = localStorage.getItem("authToken");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
    if (key !== password) {
      navigate("/menu");
    }
    dispatch(fetchCurrentUser());
  }, []);

  return (
    <Navbar expand="lg" className="bg-body-tertiary sticky-top">
      <Container>
        <Navbar.Brand as={NavLink} to={"/orders"}>
          SushiTime
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <NavLink to={"/orders"} className="nav-link">
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
            <NavDropdown title="Altro">
              <NavDropdown.Item as={NavLink} to={"/profile"}>
                Profilo
              </NavDropdown.Item>
              {currentUser && currentUser.role === "ADMIN" && (
                <NavDropdown.Item as={NavLink} to={"/users"}>
                  Visualizza STAFF
                </NavDropdown.Item>
              )}
              <NavDropdown.Divider />
              <NavDropdown.Item as={NavLink} to={"/"}>
                Esci
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default HomeNavbar;
