import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDetailByOrder } from "../../redux/actions";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { IoPerson } from "react-icons/io5";

const History = () => {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.orderDetail.byOrder);
  const orders = useSelector((state) => state.orderDetail.all);

  useEffect(() => {
    dispatch(getAllDetailByOrder(order.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <ListGroup className="mt-2">
        <ListGroup.Item active variant="secondary">
          <Row>
            <Col xs={2}>
              {" "}
              Prezzo Totale: {orders.content && formatPrice(sumPrices())}
            </Col>
            <Col>
              <IoPerson /> {order.table ? order.table.currentPeople : 0}
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
      {orders.content ? (
        Object.values(viewProduct()).map((element, index) => (
          <ListGroup key={index} className="my-3">
            <ListGroup.Item active>
              {dateFormat(element[0].orderTime)}
            </ListGroup.Item>
            {element.map((order) => (
              <ListGroup.Item key={order.id}>
                <Row className="my-2 p-2  text-center">
                  <Col>{order.product.number}</Col>
                  <Col xs={12} sm={5} md={7} xl={9} className="text-sm-start">
                    {order.product.name}
                  </Col>
                  <Col>{order.price}€</Col>
                  <Col>{order.quantity}</Col>
                  <Col>{order.state}</Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ))
      ) : (
        <div>Carrello vuoto</div>
      )}
    </Container>
  );
};

export default History;
