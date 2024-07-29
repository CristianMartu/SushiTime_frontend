import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { CiStar } from "react-icons/ci";
import { IoHome } from "react-icons/io5";
import { MdMenuBook } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getOrder, saveOrderDetails } from "../redux/actions";
import { Button, ListGroup, Modal } from "react-bootstrap";
import { BsCart } from "react-icons/bs";

const MyNavbar = () => {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order.content);

  useEffect(() => {
    dispatch(getOrder());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [show, setShow] = useState(false);

  const saveProduct = useSelector((state) => state.product.content);

  const viewProduct = saveProduct.reduce((acc, product) => {
    if (!acc[product.number]) {
      acc[product.number] = [];
    }
    acc[product.number].push(product);
    return acc;
  }, {});

  const handleFetch = () => {
    const payload = Object.keys(viewProduct).map((number) => ({
      number: Number(number),
      quantity: viewProduct[number].length,
    }));

    if (payload.length > 0) {
      dispatch(saveOrderDetails(payload));
      setShow(false);
      console.log(payload);
    }
  };

  return (
    <>
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
              <div>
                <Button
                  variant="primary"
                  className="rounded-circle"
                  onClick={() => setShow(true)}
                >
                  <BsCart />
                </Button>
              </div>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="custom-modal"
        aria-labelledby=""
      >
        <Modal.Header closeButton>
          <Modal.Title>Ordine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup as="ul">
            {saveProduct.length > 0 ? (
              Object.keys(viewProduct).map((key) => (
                <ListGroup.Item
                  as="li"
                  key={key}
                  className="d-flex justify-content-between w-75 mx-auto"
                >
                  <div>
                    {viewProduct[key][0].number} {viewProduct[key][0].name}:
                  </div>
                  <div>{viewProduct[key].length}</div>
                </ListGroup.Item>
              ))
            ) : (
              <div>Nessun prodotto salvato</div>
            )}
          </ListGroup>
          <Button variant="danger" onClick={() => handleFetch()}>
            Invio
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MyNavbar;
