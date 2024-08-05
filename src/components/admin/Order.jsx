import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  ButtonGroup,
  Container,
  Modal,
  Table,
  ToggleButton,
} from "react-bootstrap";
import {
  fetchAllOrder,
  fetchAllTable,
  fetchChangeStateOrder,
  fetchOrder,
  setId,
} from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { MdMenuBook } from "react-icons/md";

const Order = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.order.all);
  const orderId = useSelector((state) => state.order.id);
  const tables = useSelector((state) => state.table.all);

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [showTable2, setShowTable2] = useState(false);
  const [stateValue, setStateValue] = useState();

  const dateFormat = (dateStr, format = "YYYY-MM-DD HH:mm") => {
    const dateObj = new Date(dateStr);
    const parts = {
      YYYY: dateObj.getFullYear(),
      MM: String(dateObj.getMonth() + 1).padStart(2, "0"),
      DD: String(dateObj.getDate()).padStart(2, "0"),
      HH: String(dateObj.getHours()).padStart(2, "0"),
      mm: String(dateObj.getMinutes()).padStart(2, "0"),
      ss: String(dateObj.getSeconds()).padStart(2, "0"),
    };
    return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (match) => parts[match]);
  };

  const sumPrices = (order) => {
    const price = order.menuPrice * order.table.currentPeople;
    return (
      price +
      order.orderDetails.reduce((total, order) => total + order.price, 0)
    );
  };

  const formatPrice = (price, locale = "it-IT", currency = "EUR") => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(price);
  };

  const getState = [
    // { name: "IN_PROGRESS", value: "IN_PROGRESS" },
    { name: "PAID", value: "PAID" },
    { name: "CANCELED", value: "CANCELED" },
  ];

  const handleCreateOrder = (tableId) => {
    const now = new Date();
    const hours = now.getHours();
    let menuPrice = 0.0;

    if (hours >= 9 && hours < 17) {
      menuPrice = 16.9;
    } else {
      menuPrice = 24.9;
    }
    const payload = { tableId: tableId, menuPrice: menuPrice };
    // dispatch(fetchOrder(payload));
  };

  const changeState = () => {
    const payload = { state: stateValue };
    dispatch(fetchChangeStateOrder(payload, orderId));
  };

  const handleShowTable = () => {
    setShowTable(!showTable);
  };

  useEffect(() => {
    dispatch(fetchAllOrder());
    dispatch(fetchAllTable());
  }, []);

  return (
    <>
      <Container>
        <h3 className="my-3">Creazione nuovo ordine</h3>
        <h4>Seleziona tavolo:</h4>
        <Table
          striped
          bordered
          hover
          className="text-center mb-3"
          responsive="sm"
        >
          <thead>
            <tr>
              <th>Numero tavolo</th>
              <th>Massima capacità</th>
              <th>Persone correnti</th>
              <th>Stato ordine</th>
            </tr>
          </thead>
          <tbody>
            {tables.content &&
              tables.content.map((table) => {
                if (table.state === "AVAILABLE") {
                  return (
                    <tr
                      key={table.id}
                      // onClick={() => setShowModal2(true)}
                      onClick={() => {
                        handleCreateOrder(table.id), setShowModal2(true);
                      }}
                    >
                      <td>{table.number}</td>
                      <td>{table.maxCapacity}</td>
                      <td>{table.currentPeople}</td>
                      <td>{table.state}</td>
                    </tr>
                  );
                }
              })}
          </tbody>
        </Table>
        <Button className="mb-3 d-block" onClick={() => handleShowTable()}>
          Visualizza ordini in corso
        </Button>
        {showTable && (
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
                <th>Tavolo associato</th>
                <th>Data</th>
                <th>Stato</th>
                <th>Prezzo totale</th>
              </tr>
            </thead>
            <tbody>
              {data.content &&
                data.content.map(
                  (order) =>
                    order.state === "IN_PROGRESS" && (
                      <tr
                        key={order.id}
                        onClick={() => {
                          dispatch(setId(order.id));
                          setShowModal(true);
                        }}
                      >
                        <td>{order.table.number}</td>
                        <td>{dateFormat(order.date)}</td>
                        <td>{order.state}</td>
                        <td>{formatPrice(sumPrices(order))}</td>
                      </tr>
                    )
                )}
            </tbody>
          </Table>
        )}
        <Button className="mb-3" onClick={() => setShowTable2(!showTable2)}>
          Visualizza storico ordini
        </Button>
        {showTable2 && (
          <Table
            striped
            bordered
            hover
            variant="dark"
            className="text-center"
            responsive="sm"
          >
            <thead>
              <tr>
                <th>Tavolo associato</th>
                <th>Data</th>
                <th>Stato</th>
                <th>Prezzo totale</th>
              </tr>
            </thead>
            <tbody>
              {data.content &&
                data.content.map(
                  (order) =>
                    order.state !== "IN_PROGRESS" && (
                      <tr key={order.id}>
                        <td>{order.table.number}</td>
                        <td>{dateFormat(order.date)}</td>
                        <td>{order.state}</td>
                        <td>{formatPrice(sumPrices(order))}</td>
                      </tr>
                    )
                )}
            </tbody>
          </Table>
        )}
      </Container>
      <Modal
        show={showModal2}
        onHide={() => setShowModal2(false)}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Body className="d-flex align-items-center justify-content-between">
          <div className="fs-5 fw-medium">Passa a visualizzazione cliente:</div>
          <div>
            <Button
              variant="secondary"
              className="me-2"
              onClick={() => setShowModal2(false)}
            >
              Chiudi
            </Button>
            <Button variant="primary" onClick={() => navigate("/menu")}>
              <MdMenuBook />
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false), setStateValue();
        }}
        dialogClassName="custom-modal2"
        animation={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Ordine</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-md-flex justify-content-center column-gap-3 mt-2">
          <div className="align-self-center">Seleziona nuovo stato: </div>
          {getState.map((state, idx) => (
            <ButtonGroup key={idx}>
              <ToggleButton
                id={`state-${idx}`}
                type="radio"
                variant="outline-info"
                value={state.value}
                checked={stateValue === state.value}
                onChange={(e) => {
                  setStateValue(e.currentTarget.value);
                }}
              >
                {state.name}
              </ToggleButton>
            </ButtonGroup>
          ))}
        </Modal.Body>
        <Modal.Body className="d-md-flex justify-content-between">
          <Button variant="outline-danger">Elimina</Button>
          {stateValue && (
            <Button
              variant="outline-warning"
              onClick={() => {
                changeState(), setShowModal(false), setStateValue();
              }}
            >
              Modifica
            </Button>
          )}
        </Modal.Body>
        <Modal.Footer>
          <h6>Passa a visuallizzazione CLIENTE:</h6>
          {/* <Button onClick={() => handleOrder()}> */}
          <Button onClick={() => navigate("/menu")}>
            <MdMenuBook />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Order;
