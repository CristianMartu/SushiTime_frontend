import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDetailByOrder } from "../../redux/actions";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
  Grid,
} from "@mui/material";
import { IoPerson } from "react-icons/io5";

const History = () => {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.orderDetail.byOrder);
  const orders = useSelector((state) => state.orderDetail.all);

  useEffect(() => {
    if (order.id) {
      dispatch(fetchAllDetailByOrder(order.id));
    }
  }, [dispatch, order.id]);

  const viewProduct = () => {
    return orders.content.reduce((acc, order) => {
      if (!acc[order.orderTime]) {
        acc[order.orderTime] = [];
      }
      acc[order.orderTime].push(order);
      return acc;
    }, {});
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

  const sumPrices = () => {
    const price = order.menuPrice * order.table.currentPeople;
    return (
      price + orders.content.reduce((total, order) => total + order.price, 0)
    );
  };

  const formatPrice = (price, locale = "it-IT", currency = "EUR") => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(price);
  };

  return (
    <Container>
      <List sx={{ mt: 2 }}>
        <ListItem
          sx={{
            backgroundColor: "#1565c0",
            // backgroundColor: "secondary.main",
            color: "white",
            overflow: "hidden",
            borderRadius: "12px",
            paddingBlock: "15px",
          }}
        >
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                Prezzo Totale: {orders.content && formatPrice(sumPrices())}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ textAlign: "right" }}>
              <Typography variant="body1">
                <IoPerson /> {order.table ? order.table.currentPeople : 0}
              </Typography>
            </Grid>
          </Grid>
        </ListItem>
      </List>
      {orders.content ? (
        Object.values(viewProduct()).map((element, index) => (
          <List
            key={index}
            sx={{
              my: 3,
              borderRadius: "12px",
              border: "2px solid",
              borderColor: (theme) => theme.palette.secondary.main,
              // backgroundColor: "background.paper",
              padding: 0,
              overflow: "hidden",
            }}
          >
            <ListItem
              sx={{ backgroundColor: "secondary.main", color: "white" }}
            >
              <ListItemText
                primary={dateFormat(element[0].orderTime)}
                sx={{ textAlign: "center" }}
              />
            </ListItem>
            {element.map((order) => (
              <ListItem
                key={order.id}
                // divider
                sx={{
                  backgroundColor: "background.paper",
                  borderBottom: `1px solid`,
                  borderBottomColor: (theme) => theme.palette.secondary.main,
                  ":last-of-type": {
                    borderBottom: `0px`,
                  },
                  color: (theme) => theme.palette.text.dark,
                }}
              >
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs>
                    <Typography>
                      {order.product.number} {order.product.name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography>{formatPrice(order.price)}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>{order.quantity}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>{order.state}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
        ))
      ) : (
        <Typography>Carrello vuoto</Typography>
      )}
    </Container>
  );
};

export default History;
