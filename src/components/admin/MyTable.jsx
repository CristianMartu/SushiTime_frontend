import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Form, Modal, Table } from "react-bootstrap";
import {
  fetchAllTable,
  fetchPatchTable,
  fetchSaveTable,
} from "../../redux/actions";

const MyTable = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.table.all);
  const [showModal, setShowModal] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);

  const [createTable, setCreateTable] = useState({
    number: "",
    maxCapacity: "",
    currentPeople: "",
    tableId: "",
  });

  const handleCloseModal = () => {
    setShowModal(false);

    setTimeout(() => {
      setShowModalUpdate(false);
      setCreateTable({
        number: "",
        maxCapacity: "",
        currentPeople: "",
        tableId: "",
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
    } else dispatch(fetchSaveTable(payload));
  };

  useEffect(() => {
    dispatch(fetchAllTable());
  }, []);

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
              <th>Stato ordine</th>
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
            {showModalUpdate ? "Modifica" : "Salva"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default MyTable;
