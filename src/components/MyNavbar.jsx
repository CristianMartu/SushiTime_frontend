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
import {
  emptyErrorDetails,
  getAllDetailByOrder,
  getOrder,
  saveOrderDetails,
} from "../redux/actions";
import { Alert, Button, ListGroup, Modal } from "react-bootstrap";
import { BsCart } from "react-icons/bs";

const MyNavbar = () => {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order.content);
  const saveProduct = useSelector((state) => state.product.content);
  const handleError = useSelector((state) => state.error.message);
  const orderDetails = useSelector((state) => state.order.all);

  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const viewProduct = saveProduct.reduce((acc, product) => {
    if (!acc[product.number]) {
      acc[product.number] = [];
    }
    acc[product.number].push(product);
    return acc;
  }, {});

  const handleFetch = () => {
    setShow(false);
    const payload = Object.keys(viewProduct).map((number) => ({
      number: Number(number),
      quantity: viewProduct[number].length,
      price: viewProduct[number][0].price * viewProduct[number].length,
    }));

    if (payload.length > 0) {
      dispatch(saveOrderDetails(payload));
      console.log(JSON.stringify(payload));
    }
  };

  const timeToNewOrder = () => {
    const lastOrderTime = new Date(orderDetails.content[0].orderTime);
    const difference = (new Date() - lastOrderTime) / (1000 * 60);

    if (difference < 10) {
      const time = new Date(lastOrderTime.getTime() + 10 * 60000);
      // console.log(time);
      return `Prossima ordinazione: ${time
        .getHours()
        .toString()
        .padStart(2, "0")}:${time.getMinutes().toString().padStart(2, "0")}`;
    } else {
      return "";
    }
  };

  useEffect(() => {
    dispatch(getOrder());
    dispatch(getAllDetailByOrder());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
        dispatch(emptyErrorDetails());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  useEffect(() => {
    if (handleError != null) {
      setShowAlert(true);
    }
  }, [handleError]);

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
          <ListGroup as="ul" className="mb-3">
            {saveProduct.length > 0 ? (
              Object.values(viewProduct).map((key, index) => (
                <ListGroup.Item
                  as="li"
                  key={index}
                  className="d-flex justify-content-between w-75 mx-auto"
                >
                  <div>
                    {key[0].number} {key[0].name}:
                  </div>
                  <div>{key.length}</div>
                </ListGroup.Item>
              ))
            ) : (
              <div>Nessun prodotto salvato</div>
            )}
          </ListGroup>
          <div className="d-flex justify-content-between align-items-center">
            <Button variant="danger" onClick={() => handleFetch()}>
              Invio
            </Button>
            <div>
              {saveProduct.length}/
              {order.table ? order.table.currentPeople * 10 : 0}
            </div>
            <div>{orderDetails.content && timeToNewOrder()}</div>
          </div>
        </Modal.Body>
      </Modal>
      {showAlert && (
        <div className={`alert-container ${showAlert ? "visible" : "hidden"}`}>
          <Alert variant="danger">{handleError}</Alert>
        </div>
      )}
    </>
  );
};

export default MyNavbar;
