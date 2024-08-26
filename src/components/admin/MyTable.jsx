import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllTable,
  fetchDeleteTable,
  fetchPatchTable,
  fetchPatchTableState,
  fetchSaveTable,
} from "../../redux/actions";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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

const MyTable = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.table.all);
  const [showModal, setShowModal] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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

  const handleSaveChanges = (event) => {
    event.preventDefault();
    handleCloseModal();
    const payload = { ...createTable };
    if (showModalUpdate) {
      payload.number = "";
      dispatch(fetchPatchTable(payload, payload.tableId, currentPage));
      if (stateValue) {
        const send = { state: stateValue };
        dispatch(fetchPatchTableState(send, payload.tableId, currentPage));
      }
    } else dispatch(fetchSaveTable(payload, currentPage));
  };

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
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
    dispatch(fetchAllTable(currentPage, rowsPerPage));
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
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setShowModal(true)}
            sx={{ marginBlockEnd: 1 }}
          >
            <Typography variant="h6">Aggiungi tavolo</Typography>
          </Button>
          {data.page && data.page.totalElements > 0 && (
            <TablePaper>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center">
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          Numero tavolo
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          Massima capacità
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          Persone correnti
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          Stato
                        </Typography>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.content &&
                      data.content.map((table) => (
                        <TableRow
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
                          hover
                        >
                          <StyledTableCell align="center">
                            <Typography>{table.number}</Typography>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Typography>{table.maxCapacity}</Typography>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Typography>{table.currentPeople}</Typography>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Typography>{table.state}</Typography>
                          </StyledTableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <CustomTablePagination
                totalPages={data.page.totalElements}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleRowsPerPageChange}
              />
            </TablePaper>
          )}
        </Container>
      </Box>

      <Dialog
        open={showModal}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="sm"
      >
        <form onSubmit={handleSaveChanges}>
          <DialogTitle variant="h5">
            {showModalUpdate ? "Modifica tavolo" : "Nuovo Tavolo"}
          </DialogTitle>
          <DialogContent dividers sx={{ marginBlock: 2 }}>
            <TextField
              margin="dense"
              id="number"
              label="Numero"
              type="number"
              fullWidth
              value={createTable.number}
              onChange={handleChangeCreateTable}
              placeholder="Inserisci un numero"
              InputLabelProps={{ shrink: showModalUpdate ? true : undefined }}
              inputProps={{ min: 1, step: 1 }}
              autoFocus={!showModalUpdate}
              disabled={showModalUpdate}
              required
            />
            <TextField
              margin="dense"
              id="maxCapacity"
              label="Capacità massima"
              type="number"
              fullWidth
              value={createTable.maxCapacity}
              onChange={handleChangeCreateTable}
              placeholder="Inserisci un numero"
              InputLabelProps={{ shrink: showModalUpdate ? true : undefined }}
              inputProps={{ min: 1, step: 1 }}
              required
            />
            {showModalUpdate && (
              <TextField
                margin="dense"
                id="currentPeople"
                label="Persone attuali"
                type="number"
                fullWidth
                value={createTable.currentPeople}
                onChange={handleChangeCreateTable}
                placeholder="Inserisci un numero"
                InputLabelProps={{ shrink: true }}
                inputProps={{ min: 1, step: 1 }}
                autoFocus
              />
            )}
            {showModalUpdate && createTable.state !== "OCCUPIED" && (
              <ModalToggleButtonGroup
                value={stateValue}
                exclusive
                onChange={(e, newValue) => setStateValue(newValue)}
                fullWidth
                sx={{ marginBlock: 3 }}
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
    </>
  );
};
export default MyTable;
