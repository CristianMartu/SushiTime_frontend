import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { CiStar } from "react-icons/ci";
import { MdMenuBook } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  // emptyErrorDetails,
  getAllDetailByOrder,
  getOrder,
  saveOrderDetails,
} from "../../redux/actions";
import { Button, ListGroup, Modal } from "react-bootstrap";
import { BsCart } from "react-icons/bs";
import { RxExit } from "react-icons/rx";

const MyNavbar = () => {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.orderDetail.byOrder);
  const saveProduct = useSelector((state) => state.product.content);
  const orderDetails = useSelector((state) => state.orderDetail.all);
  const orderId = useSelector((state) => state.order.id);

  const [show, setShow] = useState(false);

  const viewProduct = saveProduct.reduce((acc, product) => {
    if (!acc[product.number]) {
      acc[product.number] = [];
    }
    acc[product.number].push(product);
    return acc;
  }, {});

  const validCategories = ["BEVANDE", "DOLCI", "BIRRE"];

  const getProductPrice = (name, price) => {
    if (validCategories.includes(name)) {
      return price;
    } else {
      return 0;
    }
  };

  const handleFetch = () => {
    setShow(false);
    const payload = Object.keys(viewProduct).map((number) => ({
      number: Number(number),
      quantity: viewProduct[number].length,
      price: getProductPrice(
        viewProduct[number][0].category.name,
        viewProduct[number][0].price * viewProduct[number].length
      ),
    }));

    if (payload.length > 0) {
      dispatch(saveOrderDetails(payload, orderId));
      console.log(JSON.stringify(payload));
    }
  };

  const timeToNewOrder = () => {
    if (orderDetails.content.length == 0) {
      return null;
    }
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
    dispatch(getOrder(orderId));
    dispatch(getAllDetailByOrder(orderId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveProduct]);

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={NavLink} to={"/menu"}>
            Tavolo {order.table ? order.table.number : 0}
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav>
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
              <NavLink to={"/exit"} className="nav-link">
                <RxExit />
                Esci
              </NavLink>
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
              {order.table ? order.table.currentPeople * 6 : 0}
            </div>
            <div>{orderDetails.content && timeToNewOrder()}</div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MyNavbar;
