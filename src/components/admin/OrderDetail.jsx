import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  ToggleButton,
  Typography,
  useTheme,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrderDetail,
  fetchUpdateOrderDetail,
  getOrder,
} from "../../redux/actions";
import {
  ModalDialogContent,
  ModalDialogTitle,
  ModalToggleButtonGroup,
  StyledTableCell,
  TablePaper,
} from "../../style/style";
import CustomTablePagination from "../CustomTablePagination";

const OrderDetail = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const orderDetails = useSelector((state) => state.orderDetail.orders);
  const orderId = useSelector((state) => state.order.id);
  const order = useSelector((state) => state.orderDetail.byOrder);
  const [showModal, setShowModal] = useState(false);
  const [detailOrder, setDetailOrder] = useState();
  const [stateValue, setStateValue] = useState("SERVED");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  const getState = [
    { name: "SERVED", value: "SERVED" },
    { name: "CANCELED", value: "CANCELED" },
  ];

  const handleCloseModal = () => {
    setShowModal(false);
    setTimeout(() => {
      setStateValue("SERVED");
      setDetailOrder();
    }, 150);
  };

  const handleSaveChanges = () => {
    handleCloseModal();
    const payload = { state: stateValue };
    dispatch(
      fetchUpdateOrderDetail(payload, detailOrder, currentPage, orderId)
    );
  };

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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

  useEffect(() => {
    dispatch(fetchAllOrderDetail(currentPage, rowsPerPage));
    if (orderId) {
      dispatch(getOrder(orderId));
    }
  }, [currentPage, orderId, dispatch, rowsPerPage]);

  return (
    <Box sx={{ height: "calc(100vh - 4rem)", overflow: "auto" }}>
      <Container
        maxWidth="lg"
        sx={{
          paddingBlock: "1rem",
        }}
      >
        <Typography variant="h3" color={theme.palette.secondary.light}>
          Ordinazioni in corso:{" "}
          {orderDetails.page && orderDetails.page.totalElements}
        </Typography>
        <TablePaper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      Data ordinazione
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      Quantità
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      Numero prodotto
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      Nome prodotto
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      Stato ordinazione
                    </Typography>
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderDetails.content &&
                  orderDetails.content.map((order) => (
                    <TableRow
                      key={order.id}
                      onClick={() => {
                        setShowModal(true);
                        setDetailOrder(order.id);
                      }}
                      hover
                    >
                      <StyledTableCell align="center">
                        <Typography>{dateFormat(order.orderTime)}</Typography>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Typography>{order.quantity}</Typography>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Typography>{order.product.number}</Typography>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Typography>{order.product.name}</Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Typography>{order.state}</Typography>
                      </StyledTableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          {orderDetails.page && orderDetails.page.totalElements > 1 && (
            <CustomTablePagination
              totalPages={orderDetails.page.totalElements}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          )}
        </TablePaper>
        {orderId &&
          order &&
          order.orderDetails &&
          order.orderDetails.length > 0 && (
            <>
              <Typography variant="h4" color={theme.palette.secondary.light}>
                Dettagli ordinazioni tavolo {order.table.number}
              </Typography>
              <TablePaper>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="center">
                          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            Data ordinazione
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            Quantità
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            Numero prodotto
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            Nome prodotto
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            Stato ordinazione
                          </Typography>
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {order.orderDetails.map((detail) => (
                        <TableRow
                          key={detail.id}
                          onClick={() => {
                            if (detail.state === "IN_PROGRESS") {
                              setShowModal(true);
                              setDetailOrder(detail.id);
                            }
                          }}
                          hover
                        >
                          <StyledTableCell align="center">
                            <Typography>
                              {dateFormat(detail.orderTime)}
                            </Typography>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Typography>{detail.quantity}</Typography>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Typography>{detail.product.number}</Typography>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Typography>{detail.product.name}</Typography>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Typography>{detail.state}</Typography>
                          </StyledTableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TablePaper>
            </>
          )}
      </Container>
      <Dialog
        open={showModal}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="sm"
      >
        <ModalDialogTitle variant="h5">
          Modifica stato ordinazione
        </ModalDialogTitle>
        <ModalDialogContent>
          <ModalToggleButtonGroup
            value={stateValue}
            color="secondary"
            exclusive
          >
            {getState.map((state, idx) => (
              <ToggleButton
                key={idx}
                value={state.value}
                selected={stateValue === state.value}
                onChange={() => setStateValue(state.value)}
              >
                {state.name}
              </ToggleButton>
            ))}
          </ModalToggleButtonGroup>
        </ModalDialogContent>
        <DialogActions sx={{ backgroundColor: "background.paper" }}>
          <Button onClick={handleCloseModal} color="primary">
            Annulla
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveChanges}
            color="secondary"
            disableElevation
          >
            <Typography>Modifica</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrderDetail;
