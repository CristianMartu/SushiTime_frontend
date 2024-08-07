import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  ButtonGroup,
  Container,
  Form,
  Modal,
  Table,
  ToggleButton,
} from "react-bootstrap";
import {
  fetchAllOrder,
  fetchAllOrderState,
  fetchAllTableState,
  fetchChangeStateOrder,
  fetchOrder,
  fetchPatchTable,
  setId,
} from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { MdMenuBook } from "react-icons/md";
import CustomPagination from "../CustomPagination";
import { CiStar } from "react-icons/ci";

const Order = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.order.all);
  const orderByState = useSelector((state) => state.order.allByState);
  const orderId = useSelector((state) => state.order.id);
  const tables = useSelector((state) => state.table.allByState);

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [showTable2, setShowTable2] = useState(false);
  const [showBtnUpdate, setShowBtnUpdate] = useState(false);
  const [stateValue, setStateValue] = useState();
  const [selectedOrder, setSelectedOrder] = useState();

  const [currentPageTable, setCurrentPageTable] = useState(0);
  const [currentPageOrderState, setCurrentPageOrderState] = useState(0);
  const [currentPageOrder, setCurrentPageOrder] = useState(0);

  const handlePageChangeTable = (pageNumber) => {
    setCurrentPageTable(pageNumber);
  };

  const handlePageChangeOrderState = (pageNumber) => {
    setCurrentPageOrderState(pageNumber);
  };

  const handlePageChangeOrder = (pageNumber) => {
    setCurrentPageOrder(pageNumber);
  };

  const handleToOrderDetail = () => {
    navigate("/orderDetail");
  };

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

  const [createTable, setCreateTable] = useState({
    number: "",
    maxCapacity: "",
    currentPeople: "",
    tableId: "",
  });

  const handleCloseModal = () => {
    setShowModal2(false);
    setTimeout(() => {
      setCreateTable({
        number: "",
        maxCapacity: "",
        currentPeople: "",
        tableId: "",
      });
      setShowBtnUpdate(false);
    }, 150);
  };

  const handleChangeCreateTable = (e) => {
    const { id, value } = e.target;
    setCreateTable((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    setShowBtnUpdate(true);
  };

  const handleSaveChanges = () => {
    const payload = { ...createTable };

    payload.number = "";
    console.log("Payload:", payload);
    dispatch(fetchPatchTable(payload, payload.tableId));
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
    dispatch(fetchOrder(payload));
  };

  const changeState = () => {
    const payload = { state: stateValue };
    dispatch(fetchChangeStateOrder(payload, orderId));
  };

  const handleShowTable = () => {
    setShowTable(!showTable);
  };

  useEffect(() => {
    dispatch(fetchAllTableState(currentPageTable));
  }, [currentPageTable]);

  useEffect(() => {
    dispatch(fetchAllOrderState(currentPageOrderState));
  }, [currentPageOrderState]);

  useEffect(() => {
    dispatch(fetchAllOrder(currentPageOrder));
  }, [currentPageOrder]);

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
                      onClick={() => {
                        handleCreateOrder(table.id);
                        setCreateTable({
                          number: table.number,
                          maxCapacity: table.maxCapacity,
                          currentPeople: table.currentPeople,
                          tableId: table.id,
                        });
                        setShowModal2(true);
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
        {tables.page && tables.page.totalPages > 1 && (
          <CustomPagination
            totalPages={tables.page ? tables.page.totalPages : 0}
            currentPage={currentPageTable}
            onPageChange={handlePageChangeTable}
          />
        )}
        <Button className="mb-3 d-block" onClick={() => handleShowTable()}>
          Modifica ordini in corso
        </Button>
        {showTable && (
          <>
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
                {orderByState.content &&
                  orderByState.content.map((order) => (
                    <tr
                      key={order.id}
                      onClick={() => {
                        setSelectedOrder(order);
                        dispatch(setId(order.id));
                        setShowModal(true);
                      }}
                    >
                      <td>{order.table.number}</td>
                      <td>{dateFormat(order.date)}</td>
                      <td>{order.state}</td>
                      <td>{formatPrice(sumPrices(order))}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            {orderByState.page && orderByState.page.totalPages > 1 && (
              <CustomPagination
                totalPages={
                  orderByState.page ? orderByState.page.totalPages : 0
                }
                currentPage={currentPageOrderState}
                onPageChange={handlePageChangeOrderState}
              />
            )}
          </>
        )}
        <Button className="mb-3" onClick={() => setShowTable2(!showTable2)}>
          Visualizza storico ordini
        </Button>
        {showTable2 && (
          <>
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
                  data.content.map((order) => (
                    <tr key={order.id}>
                      <td>{order.table.number}</td>
                      <td>{dateFormat(order.date)}</td>
                      <td>{order.state}</td>
                      <td>{formatPrice(sumPrices(order))}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            {data.page && data.page.totalPages > 1 && (
              <CustomPagination
                totalPages={data.page ? data.page.totalPages : 0}
                currentPage={currentPageOrder}
                onPageChange={handlePageChangeOrder}
              />
            )}
          </>
        )}
      </Container>

      <Modal
        show={showModal2}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Modifica tavolo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="number">
              <Form.Label>Numero</Form.Label>
              <Form.Control
                type="number"
                placeholder="Inserisci un numero"
                min="1"
                step="1"
                value={createTable.number}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="maxCapacity">
              <Form.Label>Capacità massima</Form.Label>
              <Form.Control
                type="number"
                placeholder="Inserisci un numero"
                min="1"
                step="1"
                value={createTable.maxCapacity}
                onChange={handleChangeCreateTable}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="currentPeople">
              <Form.Label>Persone attuali</Form.Label>
              <Form.Control
                type="number"
                placeholder="Inserisci un numero"
                min="1"
                step="1"
                value={createTable.currentPeople}
                onChange={handleChangeCreateTable}
                autoFocus
              />
            </Form.Group>
          </Form>
          {showBtnUpdate && (
            <div className="text-center">
              <Button variant="outline-primary" onClick={handleSaveChanges}>
                Modifica
              </Button>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
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
        </Modal.Footer>
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
        {selectedOrder && selectedOrder.orderDetails.length > 0 && (
          <Modal.Footer>
            <h6 className="m-0 me-2 align-self-center">
              Modifica dettagli ordine
            </h6>
            <Button onClick={handleToOrderDetail}>
              <CiStar />
            </Button>
          </Modal.Footer>
        )}
        <Modal.Footer>
          <h6>Passa a visuallizzazione CLIENTE:</h6>
          <Button onClick={() => navigate("/menu")}>
            <MdMenuBook />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Order;
