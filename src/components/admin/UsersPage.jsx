import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUser,
  fetchDeleteUser,
  fetchPatchUserRole,
  fetchSaveUser,
} from "../../redux/actions";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ToggleButton,
  Typography,
} from "@mui/material";
import {
  ModalToggleButtonGroup,
  StyledTableCell,
  TablePaper,
} from "../../style/style";
import CustomTablePagination from "../CustomTablePagination";

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

  const handleSaveChanges = (event) => {
    event.preventDefault();
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

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(fetchAllUser(currentPage, rowsPerPage));
  }, [currentPage, dispatch, rowsPerPage]);

  return (
    <>
      <Box sx={{ height: "calc(100vh - 4rem)", overflow: "auto" }}>
        <Container
          maxWidth="lg"
          sx={{
            paddingBlock: "1rem",
          }}
        >
          <Typography variant="h3" color={"secondary"}>
            Staff
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            sx={{ marginBlockEnd: 1 }}
            onClick={() => {
              setShowModal(true);
              setShowForm(true);
            }}
          >
            <Typography>Aggiungi utente</Typography>
          </Button>
          <TablePaper>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">
                      <Typography variant="h6">Ruolo</Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Typography variant="h6">Nome</Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Typography variant="h6">Cognome</Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Typography variant="h6">Email</Typography>
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.content &&
                    users.content.map((user) => {
                      if (user.id !== currentUser.id) {
                        return (
                          <TableRow
                            key={user.id}
                            onClick={() => {
                              setShowModal(true);
                              setShowModalUpdate(true);
                              setUserId(user.id);
                            }}
                            hover
                          >
                            <StyledTableCell align="center">
                              <Typography>{user.role}</Typography>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <Typography>{user.name}</Typography>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <Typography>{user.surname}</Typography>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <Typography>{user.email}</Typography>
                            </StyledTableCell>
                          </TableRow>
                        );
                      }
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            {users.page && users.page.totalElements > 1 && (
              <CustomTablePagination
                totalPages={users.page.totalElements - 1} // 1 per utente corrente
                currentPage={currentPage}
                onPageChange={handlePageChange}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleRowsPerPageChange}
              />
            )}
          </TablePaper>
        </Container>
        <Dialog
          open={showModal}
          onClose={handleCloseModal}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle variant="h5">
            {showModalUpdate ? "Modifica" : "Aggiungi"}
          </DialogTitle>
          <form onSubmit={handleSaveChanges}>
            <DialogContent dividers>
              {showForm && (
                <>
                  <FormControl fullWidth margin="dense">
                    <TextField
                      id="formName"
                      label="Nome"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Inserire nome"
                      required
                      autoFocus
                    />
                  </FormControl>
                  <FormControl fullWidth margin="dense">
                    <TextField
                      id="formSurname"
                      label="Cognome"
                      name="surname"
                      value={formData.surname}
                      onChange={handleChange}
                      placeholder="Inserire cognome"
                      required
                    />
                  </FormControl>
                  <FormControl fullWidth margin="dense">
                    <TextField
                      id="formEmail"
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Inserire email"
                      required
                    />
                  </FormControl>
                  <FormControl fullWidth margin="dense">
                    <TextField
                      id="formPassword"
                      label="Password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Inserire password"
                      required
                    />
                  </FormControl>
                </>
              )}

              {showModalUpdate && (
                <ModalToggleButtonGroup
                  value={roleValue}
                  exclusive
                  onChange={(e, value) => setRoleValue(value)}
                  sx={{ marginBlock: "1.5rem" }}
                >
                  {getState.map((state, idx) => (
                    <ToggleButton key={idx} value={state.value}>
                      {state.name}
                    </ToggleButton>
                  ))}
                </ModalToggleButtonGroup>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal} color="primary">
                Annulla
              </Button>
              {showModalUpdate && (
                <Button onClick={handleDelete} color="error" variant="outlined">
                  Elimina
                </Button>
              )}
              <Button type="submit" variant="contained" color="primary">
                {showModalUpdate ? "Modifica" : "Salva"}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Box>
    </>
  );
};

export default UsersPage;
