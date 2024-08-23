import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { CiStar } from "react-icons/ci";
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
  useTheme,
} from "@mui/material";
import {
  ModalToggleButtonGroup,
  StyledDarkTableCell,
  StyledTableCell,
  TablePaper,
} from "../../style/style";
import CustomTablePagination from "../CustomTablePagination";

const Order = () => {
  const theme = useTheme();
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

  const [rowsPerPageTable, setRowsPerPageTable] = useState(10);
  const [currentPageTable, setCurrentPageTable] = useState(0);
  const [rowsPerPageOrderState, setRowsPerPageOrderState] = useState(10);
  const [currentPageOrderState, setCurrentPageOrderState] = useState(0);
  const [rowsPerPageOrder, setRowsPerPageOrder] = useState(10);
  const [currentPageOrder, setCurrentPageOrder] = useState(0);

  const handleRowsPerPageTable = (newRowsPerPage) => {
    setRowsPerPageTable(newRowsPerPage);
  };
  const handlePageChangeTable = (pageNumber) => {
    setCurrentPageTable(pageNumber);
  };

  const handleRowsPerPageOrderState = (newRowsPerPage) => {
    setRowsPerPageOrderState(newRowsPerPage);
  };
  const handlePageChangeOrderState = (pageNumber) => {
    setCurrentPageOrderState(pageNumber);
  };

  const handleRowsPerPageOrder = (newRowsPerPage) => {
    setRowsPerPageOrder(newRowsPerPage);
  };
  const handlePageChangeOrder = (pageNumber) => {
    setCurrentPageOrder(pageNumber);
  };

  const handleToOrderDetail = () => {
    navigate("/orderDetail");
  };

  const dateFormat = (dateStr, format = "HH:mm") => {
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
    dispatch(fetchAllTableState(currentPageTable, rowsPerPageTable));
  }, [currentPageTable, dispatch, rowsPerPageTable]);

  useEffect(() => {
    dispatch(fetchAllOrderState(currentPageOrderState, rowsPerPageOrderState));
  }, [currentPageOrderState, dispatch, rowsPerPageOrderState]);

  useEffect(() => {
    dispatch(fetchAllOrder(currentPageOrder, rowsPerPageOrder));
  }, [currentPageOrder, dispatch, rowsPerPageOrder]);

  return (
    <>
      <Box sx={{ height: "calc(100vh - 4rem)", overflow: "auto" }}>
        <Container
          maxWidth="lg"
          sx={{
            paddingBlock: "1rem",
          }}
        >
          <Typography variant="h3" color={theme.palette.secondary.light}>
            Creazione nuovo ordine
          </Typography>
          <Typography variant="h4" color={theme.palette.secondary.light}>
            Seleziona tavolo:
          </Typography>
          <TablePaper>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        Numero tavolo
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        Massima capacità
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        Persone correnti
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        Stato ordine
                      </Typography>
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tables.content &&
                    tables.content.map((table) => (
                      <TableRow
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
            {tables.page && tables.page.totalElements > 1 && (
              <CustomTablePagination
                totalPages={tables.page.totalElements}
                currentPage={currentPageTable}
                onPageChange={handlePageChangeTable}
                rowsPerPage={rowsPerPageTable}
                onRowsPerPageChange={handleRowsPerPageTable}
              />
            )}
          </TablePaper>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleShowTable()}
            sx={{ marginBlockEnd: 1 }}
          >
            <Typography>Modifica ordini in corso</Typography>
          </Button>
          {showTable && (
            <TablePaper>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center">
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          Tavolo associato
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          Data
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          Stato
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          Prezzo totale
                        </Typography>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderByState.content &&
                      orderByState.content.map((order) => (
                        <TableRow
                          key={order.id}
                          onClick={() => {
                            setSelectedOrder(order);
                            dispatch(setId(order.id));
                            localStorage.setItem("orderId", order.id);
                            setShowModal(true);
                          }}
                          hover
                        >
                          <StyledTableCell align="center">
                            <Typography>{order.table.number}</Typography>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Typography>{dateFormat(order.date)}</Typography>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Typography>{order.state}</Typography>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Typography>
                              {formatPrice(sumPrices(order))}
                            </Typography>
                          </StyledTableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {orderByState.page && orderByState.page.totalElements > 1 && (
                <CustomTablePagination
                  totalPages={orderByState.page.totalElements}
                  currentPage={currentPageOrderState}
                  onPageChange={handlePageChangeOrderState}
                  rowsPerPage={rowsPerPageOrderState}
                  onRowsPerPageChange={handleRowsPerPageOrderState}
                />
              )}
            </TablePaper>
          )}
          <Button
            variant="contained"
            sx={{
              marginBlock: 1,
              display: "block",
              backgroundColor: theme.palette.primary.light,
              ":hover": {
                backgroundColor: theme.palette.primary.main,
              },
            }}
            onClick={() => setShowTable2(!showTable2)}
          >
            <Typography>Visualizza storico ordini</Typography>
          </Button>
          {showTable2 && (
            <TablePaper>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <StyledDarkTableCell align="center">
                        <Typography variant="h6">Tavolo associato</Typography>
                      </StyledDarkTableCell>
                      <StyledDarkTableCell align="center">
                        <Typography variant="h6">Data</Typography>
                      </StyledDarkTableCell>
                      <StyledDarkTableCell align="center">
                        <Typography variant="h6">Stato</Typography>
                      </StyledDarkTableCell>
                      <StyledDarkTableCell align="center">
                        <Typography variant="h6">Prezzo totale</Typography>
                      </StyledDarkTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.content &&
                      data.content.map((order) => (
                        <TableRow key={order.id}>
                          <StyledDarkTableCell align="center">
                            <Typography>{order.table.number}</Typography>
                          </StyledDarkTableCell>
                          <StyledDarkTableCell align="center">
                            <Typography>
                              {dateFormat(order.date, "DD.MM.YYYY - HH:mm")}
                            </Typography>
                          </StyledDarkTableCell>
                          <StyledDarkTableCell align="center">
                            <Typography>{order.state}</Typography>
                          </StyledDarkTableCell>
                          <StyledDarkTableCell align="center">
                            <Typography>
                              {formatPrice(sumPrices(order))}
                            </Typography>
                          </StyledDarkTableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {data.page && data.page.totalElements > 1 && (
                <CustomTablePagination
                  totalPages={data.page.totalElements}
                  currentPage={currentPageOrder}
                  onPageChange={handlePageChangeOrder}
                  rowsPerPage={rowsPerPageOrder}
                  onRowsPerPageChange={handleRowsPerPageOrder}
                  styledColor="true"
                  sx={{
                    backgroundColor: theme.palette.common.darkOrange,
                    color: theme.palette.common.contrast,
                  }}
                />
              )}
            </TablePaper>
          )}
        </Container>
      </Box>
      <Dialog
        open={showModal2}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="sm"
        disableEscapeKeyDown
      >
        <DialogTitle variant="h5">Modifica tavolo</DialogTitle>
        <DialogContent dividers>
          <TextField
            margin="dense"
            id="number"
            label="Numero"
            type="number"
            fullWidth
            value={createTable.number}
            placeholder="Inserisci un numero"
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: 1, step: 1 }}
            readOnly
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
            inputProps={{ min: 1, step: 1 }}
          />
          <TextField
            margin="dense"
            id="currentPeople"
            label="Persone attuali"
            type="number"
            fullWidth
            value={createTable.currentPeople}
            onChange={handleChangeCreateTable}
            placeholder="Inserisci un numero"
            inputProps={{ min: 1, step: 1 }}
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Typography variant="primary">
            Passa a visualizzazione cliente:
          </Typography>
          <Button onClick={() => setShowModal2(false)} color="primary">
            Chiudi
          </Button>
          {showBtnUpdate && (
            <Button
              variant="outlined"
              color="primary"
              onClick={handleSaveChanges}
            >
              Modifica
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/menu")}
          >
            <MdMenuBook size={24} />
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showModal}
        onClose={() => {
          setShowModal(false);
          setStateValue();
        }}
        fullWidth
        maxWidth="sm"
        disableEscapeKeyDown
        scroll="paper"
      >
        <DialogTitle variant="h5">Ordine</DialogTitle>
        <DialogContent dividers>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={3}
            marginBlock={1}
          >
            <Typography variant="subtitle1" component="div">
              Seleziona nuovo stato:
            </Typography>
            <ModalToggleButtonGroup
              value={stateValue}
              exclusive
              onChange={(e, newValue) => {
                setStateValue(newValue);
              }}
              color="primary"
            >
              {getState.map((state, idx) => (
                <ToggleButton key={idx} value={state.value}>
                  {state.name}
                </ToggleButton>
              ))}
            </ModalToggleButtonGroup>
          </Box>
        </DialogContent>
        {selectedOrder && selectedOrder.orderDetails.length > 0 && (
          <DialogActions
            sx={{
              paddingBlockStart: 1,
              borderBlockEnd: "1px solid",
              borderColor: theme.palette.common.lightGray,
            }}
          >
            <Typography variant="primary">
              Visualizza dettagli ordine
            </Typography>
            <Button onClick={handleToOrderDetail}>
              <CiStar size={24} />
            </Button>
          </DialogActions>
        )}
        <DialogActions sx={{ paddingBlockStart: 2 }}>
          <Typography variant="primary">
            Passa a visualizzazione CLIENTE:
          </Typography>
          {stateValue && (
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                changeState();
                setShowModal(false);
                setStateValue();
              }}
            >
              Modifica
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/menu")}
            disableElevation
          >
            <MdMenuBook size={24} />
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default Order;
