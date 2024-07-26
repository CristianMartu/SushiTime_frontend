import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { CiStar } from "react-icons/ci";
import { IoHome } from "react-icons/io5";
import { MdMenuBook } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getOrder } from "../redux/actions";

const MyNavbar = () => {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order.content);

  useEffect(() => {
    dispatch(getOrder());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={NavLink} to={"/"}>
          Tavolo {order.table ? order.table.number : 0}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to={"/"} className="nav-link">
              <IoHome />
              Home
            </NavLink>
            <NavLink to={"/menu"} className="nav-link">
              <MdMenuBook />
              Menù
            </NavLink>
            <NavLink to={"/history"} className="nav-link">
              <CiStar />
              Storico
            </NavLink>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
