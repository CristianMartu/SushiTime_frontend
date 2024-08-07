import { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Container,
  Modal,
  Table,
  ToggleButton,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrderDetail,
  fetchUpdateOrderDetail,
  getOrder,
} from "../../redux/actions";
import CustomPagination from "../CustomPagination";

const OrderDetail = () => {
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetail.orders);
  const orderId = useSelector((state) => state.order.id);
  const order = useSelector((state) => state.orderDetail.byOrder);
  // const orderDetailsByOrder = useSelector((state) => state.orderDetail.all);
  const [showModal, setShowModal] = useState(false);
  const [detailOrder, setDetailOrder] = useState();

  const handleCloseModal = () => {
    setShowModal(false);
    setTimeout(() => {
      setStateValue("SERVED");
      setDetailOrder();
    }, 150);
  };

  const [stateValue, setStateValue] = useState("SERVED");
  const getState = [
    { name: "SERVED", value: "SERVED" },
    { name: "CANCELED", value: "CANCELED" },
  ];

  const handleSaveChanges = () => {
    console.log(stateValue);
    const payload = { state: stateValue };
    dispatch(fetchUpdateOrderDetail(payload, detailOrder, currentPage));
  };

  const [currentPage, setCurrentPage] = useState(0);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    dispatch(fetchAllOrderDetail(currentPage));
    if (orderId) {
      // dispatch(getAllDetailByOrder(orderId));
      dispatch(getOrder(orderId));
    }
  }, [currentPage]);

  return (
    <>
      <Container>
        <h3>
          Ordinazioni totali in corso:{" "}
          {orderDetails.page && orderDetails.page.totalElements}
        </h3>
        <Table
          striped
          bordered
          hover
          variant="secondary"
          className="text-center"
          responsive="sm"
        >
          <thead>
            <tr>
              <th>Data ordinazione</th>
              <th>Quantità</th>
              <th>Numero prodotto</th>
              <th>Nome prodotto</th>
              <th>Stato ordinazione</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.content &&
              orderDetails.content.map((order) => (
                <tr
                  key={order.id}
                  onClick={() => {
                    setShowModal(true);
                    setDetailOrder(order.id);
                  }}
                >
                  <td>{order.orderTime}</td>
                  <td>{order.quantity}</td>
                  <td>{order.product.number}</td>
                  <td>{order.product.name}</td>
                  <td>{order.state}</td>
                </tr>
              ))}
          </tbody>
        </Table>
        {orderDetails.page && orderDetails.page.totalPages > 1 && (
          <CustomPagination
            totalPages={orderDetails.page ? orderDetails.page.totalPages : 0}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
        {orderId && order && order.orderDetails.length > 0 && (
          <>
            <h5>Dettagli ordinazioni tavolo {order.table.number}</h5>
            <Table
              striped
              bordered
              hover
              variant="secondary"
              className="text-center"
              responsive="sm"
            >
              <thead>
                <tr>
                  <th>Data ordinazione</th>
                  <th>Quantità</th>
                  <th>Numero prodotto</th>
                  <th>Nome prodotto</th>
                  <th>Stato ordinazione</th>
                </tr>
              </thead>
              <tbody>
                {order.orderDetails.map((detail) => (
                  <tr
                    key={detail.id}
                    onClick={() => {
                      if (detail.state === "IN_PROGRESS") {
                        setShowModal(true);
                        setDetailOrder(detail.id);
                      }
                    }}
                  >
                    <td>{detail.orderTime}</td>
                    <td>{detail.quantity}</td>
                    <td>{detail.product.number}</td>
                    <td>{detail.product.name}</td>
                    <td>{detail.state}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </Container>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Modifica stato ordinazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ButtonGroup>
            {getState.map((state, idx) => (
              <ToggleButton
                key={idx}
                id={`state-${idx}`}
                type="radio"
                variant="outline-primary"
                value={state.value}
                checked={stateValue === state.value}
                onChange={(e) => {
                  setStateValue(e.currentTarget.value);
                }}
              >
                {state.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Annulla
          </Button>

          <Button
            variant="primary"
            onClick={() => {
              handleCloseModal(), handleSaveChanges();
            }}
          >
            Modifica
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OrderDetail;
