import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CiStar } from "react-icons/ci";
import { MdMenuBook } from "react-icons/md";
import { BsCart } from "react-icons/bs";
import { RxExit } from "react-icons/rx";

import {
  Box,
  Button,
  Container,
  IconButton,
  List,
  Modal,
  Typography,
  useTheme,
} from "@mui/material";

import {
  fetchAllDetailByOrder,
  getOrder,
  saveOrderDetails,
} from "../../redux/actions";

import { StyledAppBar, ModalBox, StyledListItem } from "./../../style/style";

const MyNavbar = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const order = useSelector((state) => state.orderDetail.byOrder);
  const saveProduct = useSelector((state) => state.product.content);
  const orderDetails = useSelector((state) => state.orderDetail.all);
  const orderId = useSelector((state) => state.order.id);

  const [show, setShow] = useState(false);

  const viewProduct = saveProduct.reduce((acc, product) => {
    if (!acc[product.number]) {
      acc[product.number] = [];
    }
    acc[product.number].push(product);
    return acc;
  }, {});

  const validCategories = ["BEVANDE", "DOLCI", "BIRRE"];

  const getProductPrice = (name, price) => {
    if (validCategories.includes(name)) {
      return price;
    } else {
      return 0;
    }
  };

  const handleFetch = () => {
    setShow(false);
    const payload = Object.keys(viewProduct).map((number) => ({
      number: Number(number),
      quantity: viewProduct[number].length,
      price: getProductPrice(
        viewProduct[number][0].category.name,
        viewProduct[number][0].price * viewProduct[number].length
      ),
    }));

    if (payload.length > 0) {
      dispatch(saveOrderDetails(payload, order.id));
      console.log(JSON.stringify(payload));
    }
  };

  const timeToNewOrder = () => {
    if (orderDetails.content.length == 0) {
      return null;
    }
    const lastOrderTime = new Date(orderDetails.content[0].orderTime);
    const difference = (new Date() - lastOrderTime) / (1000 * 60);

    if (difference < 10) {
      const time = new Date(lastOrderTime.getTime() + 10 * 60000);
      return `Prossima ordinazione: ${time
        .getHours()
        .toString()
        .padStart(2, "0")}:${time.getMinutes().toString().padStart(2, "0")}`;
    } else {
      return "";
    }
  };

  useEffect(() => {
    if (orderId) {
      dispatch(getOrder(orderId));
      dispatch(fetchAllDetailByOrder(orderId));
    } else {
      const id = localStorage.getItem("orderId");
      dispatch(getOrder(id));
      dispatch(fetchAllDetailByOrder(id));
    }

    localStorage.setItem("adminPassword", null);
  }, [saveProduct, dispatch, orderId]);

  return (
    <>
      <StyledAppBar position="sticky">
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "4rem",
            }}
          >
            <Typography
              variant="h5"
              component={Link}
              to="/menu"
              sx={{
                textDecoration: "none",
                color: theme.palette.background.default,
              }}
            >
              Tavolo {order.table ? order.table.number : 0}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                component={Link}
                to="/menu"
                color="inherit"
                startIcon={<MdMenuBook />}
                sx={{
                  color: theme.palette.text.light,
                  marginRight: 4,
                  "&:hover": {
                    color: theme.palette.common.white,
                  },
                }}
              >
                <Typography variant="body1">MENÙ</Typography>
              </Button>
              <Button
                component={Link}
                to="/history"
                color="inherit"
                startIcon={<CiStar />}
                sx={{
                  color: theme.palette.text.light,
                  marginRight: 4,
                  "&:hover": {
                    color: theme.palette.common.white,
                  },
                }}
              >
                <Typography variant="body1">STORICO</Typography>
              </Button>
              <IconButton
                color="inherit"
                onClick={() => setShow(true)}
                // sx={{
                //   backgroundColor: theme.palette.secondary.main,
                //   marginRight: 4,
                //   padding: "10px",
                //   border: "1px solid white",
                // }}
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  marginRight: 4,
                  padding: "15px",
                  border: `6px solid ${theme.palette.primary.main}`,
                  boxShadow: "0px 7px 5px -4px rgba(0, 0, 0, 1)",
                  "&:hover": {
                    backgroundColor: theme.palette.secondary.dark,
                  },
                  marginBlockStart: "28px",
                }}
              >
                <BsCart
                  style={{
                    color: theme.palette.common.white,
                    fontSize: "1.8rem",
                  }}
                />
              </IconButton>
              <Button
                component={Link}
                to="/exit"
                color="inherit"
                startIcon={<RxExit />}
                sx={{
                  color: theme.palette.text.light,
                  "&:hover": {
                    color: theme.palette.common.white,
                  },
                }}
              >
                <Typography variant="body1">ESCI</Typography>
              </Button>
            </Box>
          </Box>
        </Container>
      </StyledAppBar>

      <Modal open={show} onClose={() => setShow(false)}>
        <ModalBox>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              color: theme.palette.primary.light,
              fontWeight: "bold",
            }}
          >
            Ordine
          </Typography>
          <List
            sx={{
              maxHeight: "50vh",
              overflowY: "auto",
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: theme.palette.common.lightGray,
              },
            }}
          >
            {saveProduct.length > 0 ? (
              Object.values(viewProduct).map((key, index) => (
                <StyledListItem key={index} divider>
                  <Typography
                    variant="h6"
                    sx={{
                      marginInlineEnd: "auto",
                      color: theme.palette.text.dark,
                      // fontWeight: "650",
                    }}
                  >{`${key[0].number} ${key[0].name}:`}</Typography>
                  <Typography
                    sx={{
                      color: theme.palette.primary.light,
                    }}
                  >
                    {key.length}
                  </Typography>
                </StyledListItem>
              ))
            ) : (
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: "",
                }}
              >
                Nessun prodotto salvato
              </Typography>
            )}
          </List>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={() => handleFetch()}
              sx={{
                paddingInline: "20px",
                backgroundColor: theme.palette.secondary.main,
                "&:hover": {
                  backgroundColor: theme.palette.primary.light,
                },
              }}
            >
              <Typography variant="body1">INVIA</Typography>
            </Button>
            <Typography
              sx={{
                color: theme.palette.primary.light,
                fontWeight: "bold",
              }}
            >
              {saveProduct.length}/
              {order.table ? order.table.currentPeople * 6 : 0}
            </Typography>
            <Typography sx={{ color: theme.palette.common.darkRed }}>
              {orderDetails.content && timeToNewOrder()}
            </Typography>
          </Box>
        </ModalBox>
      </Modal>
    </>
  );
};

export default MyNavbar;
