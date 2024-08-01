import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDetailByOrder } from "../redux/actions";
import { Col, Container, ListGroup, Row } from "react-bootstrap";

const History = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.all);

  useEffect(() => {
    dispatch(getAllDetailByOrder());
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

  const dateFormat = (dateStr, format) => {
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

  return (
    <Container>
      {orders.content ? (
        Object.values(viewProduct()).map((element, index) => (
          <ListGroup key={index} className="my-3">
            <ListGroup.Item active>
              {dateFormat(element[0].orderTime, "YYYY-MM-DD HH:mm")}
              {/* {dateFormat(element[0].orderTime)} */}
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
