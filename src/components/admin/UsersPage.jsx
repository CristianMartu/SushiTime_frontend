import { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Container,
  Form,
  Modal,
  Table,
  ToggleButton,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUser,
  fetchDeleteUser,
  fetchPatchUserRole,
  fetchSaveUser,
} from "../../redux/actions";
import CustomPagination from "../CustomPagination";

const UsersPage = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.all);
  const currentUser = useSelector((state) => state.user.currentUser);

  const [userId, setUserId] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setUserId();
    setTimeout(() => {
      setShowForm(false);
      setShowModalUpdate(false);
      setFormData({
        name: "",
        surname: "",
        email: "",
        password: "",
      });
    }, 150);
  };

  const [roleValue, setRoleValue] = useState("");
  const getState = [
    { name: "ADMIN", value: "ADMIN" },
    { name: "STAFF", value: "STAFF" },
  ];

  const handleSaveChanges = () => {
    handleCloseModal();
    console.log(roleValue);
    if (userId && showModalUpdate) {
      const payload = { role: roleValue };
      dispatch(fetchPatchUserRole(payload, userId, currentPage));
    } else if (showForm) {
      dispatch(fetchSaveUser(formData, currentPage));
    }
  };

  const handleDelete = () => {
    handleCloseModal();
    dispatch(fetchDeleteUser(userId));
  };

  const [currentPage, setCurrentPage] = useState(0);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(fetchAllUser(currentPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <>
      <Container>
        <h3>Staff</h3>
        <Button
          className="mb-3"
          onClick={() => {
            setShowModal(true);
            setShowForm(true);
          }}
        >
          Aggiungi utente
        </Button>
        <Table
          striped
          bordered
          hover
          className="text-center mb-3"
          responsive="sm"
        >
          <thead>
            <tr>
              <th>Ruolo</th>
              <th>Nome</th>
              <th>Cognome</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.content &&
              users.content.map((user) => {
                if (user.id !== currentUser.id) {
                  return (
                    <tr
                      key={user.id}
                      onClick={() => {
                        setShowModal(true);
                        setShowModalUpdate(true);
                        setUserId(user.id);
                      }}
                    >
                      <td>{user.role}</td>
                      <td>{user.name}</td>
                      <td>{user.surname}</td>
                      <td>{user.email}</td>
                    </tr>
                  );
                }
              })}
          </tbody>
        </Table>
        {users.page && users.page.totalPages > 1 && (
          <CustomPagination
            totalPages={users.page ? users.page.totalPages : 0}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </Container>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>Modifica</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {showForm && (
              <>
                <Form.Group controlId="formName">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Inserire nome"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    autoFocus
                  />
                </Form.Group>

                <Form.Group controlId="formSurname">
                  <Form.Label>Cognome</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Inserire cognome"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Inserire email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Inserire password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </>
            )}
            {showModalUpdate && (
              <ButtonGroup>
                {getState.map((state, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`state-${idx}`}
                    type="radio"
                    variant="outline-primary"
                    value={state.value}
                    checked={roleValue === state.value}
                    onChange={(e) => {
                      setRoleValue(e.currentTarget.value);
                    }}
                  >
                    {state.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            )}
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
            <Button variant="primary" onClick={handleSaveChanges}>
              {showModalUpdate ? "Modifica" : "Salva"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default UsersPage;
