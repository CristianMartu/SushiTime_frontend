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
  fetchAllTable,
  fetchDeleteTable,
  fetchPatchTable,
  fetchPatchTableState,
  fetchSaveTable,
} from "../../redux/actions";
import CustomPagination from "../CustomPagination";

const MyTable = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.table.all);
  const [showModal, setShowModal] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [stateValue, setStateValue] = useState();

  const [createTable, setCreateTable] = useState({
    number: "",
    maxCapacity: "",
    currentPeople: "",
    tableId: "",
    state: "",
  });

  const handleCloseModal = () => {
    setShowModal(false);

    setTimeout(() => {
      setShowModalUpdate(false);
      setStateValue();
      setCreateTable({
        number: "",
        maxCapacity: "",
        currentPeople: "",
        tableId: "",
        state: "",
      });
    }, 150);
  };

  const handleChangeCreateTable = (e) => {
    const { id, value } = e.target;
    setCreateTable((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSaveChanges = () => {
    const payload = { ...createTable };

    console.log("Payload:", payload);

    if (showModalUpdate) {
      payload.number = "";
      dispatch(fetchPatchTable(payload, payload.tableId));
      if (stateValue) {
        const send = { state: stateValue };
        dispatch(fetchPatchTableState(send, payload.tableId));
      }
    } else dispatch(fetchSaveTable(payload));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = () => {
    handleCloseModal();
    dispatch(fetchDeleteTable(createTable.tableId));
  };

  const getState = [
    { name: "AVAILABLE", value: "AVAILABLE" },
    { name: "RESERVED", value: "RESERVED" },
    { name: "OUT_OF_SERVICE", value: "OUT_OF_SERVICE" },
  ];

  useEffect(() => {
    dispatch(fetchAllTable(currentPage));
  }, [currentPage]);

  return (
    <>
      <Container>
        <h3 className="my-3">
          Tavoli totali: {data.page && data.page.totalElements}
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
              <th>Numero tavolo</th>
              <th>Massima capacità</th>
              <th>Persone correnti</th>
              <th>Stato</th>
            </tr>
          </thead>
          <tbody>
            {data.content &&
              data.content.map((table) => (
                <tr
                  key={table.id}
                  onClick={() => {
                    setCreateTable({
                      number: table.number,
                      maxCapacity: table.maxCapacity,
                      currentPeople: table.currentPeople,
                      tableId: table.id,
                      state: table.state,
                    });
                    setShowModal(true);
                    setShowModalUpdate(true);
                  }}
                >
                  <td>{table.number}</td>
                  <td>{table.maxCapacity}</td>
                  <td>{table.currentPeople}</td>
                  <td>{table.state}</td>
                </tr>
              ))}
          </tbody>
        </Table>
        {data.page && data.page.totalPages > 1 && (
          <CustomPagination
            totalPages={data.page.totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
        <Button className="mb-3" onClick={() => setShowModal(true)}>
          Aggiungi tavolo
        </Button>
      </Container>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {showModalUpdate ? "Modifica tavolo" : "Nuovo Tavolo"}
          </Modal.Title>
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
                onChange={handleChangeCreateTable}
                autoFocus
                readOnly={showModalUpdate && true}
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
            {showModalUpdate && (
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
            )}
          </Form>
          <ButtonGroup>
            {showModalUpdate &&
              createTable.state != "OCCUPIED" &&
              getState.map((state, idx) => (
                <ToggleButton
                  key={idx}
                  id={`state-${idx}`}
                  type="radio"
                  // variant={idx % 2 ? "outline-primary" : "outline-danger"}
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
          {showModalUpdate && (
            <Button variant="outline-danger" onClick={handleDelete}>
              Elimina
            </Button>
          )}
          <Button
            variant="primary"
            onClick={() => {
              handleCloseModal(), handleSaveChanges();
            }}
          >
            {showModalUpdate ? "Modifica" : "Salva"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default MyTable;
