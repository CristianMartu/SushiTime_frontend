import { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
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
  Paper,
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
import CustomPagination from "../CustomPagination";
import { StyledTableCell } from "../../style/style";

const OrderDetail = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const orderDetails = useSelector((state) => state.orderDetail.orders);
  const orderId = useSelector((state) => state.order.id);
  const order = useSelector((state) => state.orderDetail.byOrder);
  const [showModal, setShowModal] = useState(false);
  const [detailOrder, setDetailOrder] = useState();
  const [stateValue, setStateValue] = useState("SERVED");
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(fetchAllOrderDetail(currentPage));
    if (orderId) {
      dispatch(getOrder(orderId));
    }
  }, [currentPage, orderId, dispatch]);

  return (
    <Box sx={{ height: "calc(100vh - 4rem)", overflow: "auto" }}>
      <Container
        maxWidth="lg"
        sx={{
          paddingBlock: "1rem",
        }}
      >
        <Typography variant="h3" color={theme.palette.secondary.light}>
          Ordinazioni totali in corso:{" "}
          {orderDetails.page && orderDetails.page.totalElements}
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>
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
                    <StyledTableCell>
                      <Typography>{order.orderTime}</Typography>
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
        {orderDetails.page && orderDetails.page.totalPages > 1 && (
          <CustomPagination
            totalPages={orderDetails.page ? orderDetails.page.totalPages : 0}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
        {orderId &&
          order &&
          order.orderDetails &&
          order.orderDetails.length > 0 && (
            <>
              <Typography variant="h4" color={theme.palette.secondary.light}>
                Dettagli ordinazioni tavolo {order.table.number}
              </Typography>
              <TableContainer component={Paper}>
                <Table variant="outlined" size="small">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>
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
                        <StyledTableCell>
                          <Typography>{detail.orderTime}</Typography>
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
            </>
          )}
      </Container>
      <Dialog
        open={showModal}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Modifica stato ordinazione</DialogTitle>
        <DialogContent>
          <ButtonGroup color="primary" fullWidth>
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
          </ButtonGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Annulla
          </Button>
          <Button onClick={handleSaveChanges} color="primary">
            Modifica
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrderDetail;
