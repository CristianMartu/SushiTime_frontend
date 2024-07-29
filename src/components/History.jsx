import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDetailByOrder } from "../redux/actions";
import { Col, Container, Row } from "react-bootstrap";

const History = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.all);

  useEffect(() => {
    dispatch(getAllDetailByOrder());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      {Array.isArray(orders.content) ? (
        orders.content.map((order) => (
          <Row key={order.id} className="my-2 p-2 border rounded text-center">
            <Col>{order.product.number}</Col>
            <Col xs={12} sm={5} md={7} xl={9} className="text-sm-start">
              {order.product.name}
            </Col>
            <Col>{order.product.price}€</Col>
            <Col>{order.quantity}</Col>
            <Col>{order.state}</Col>
          </Row>
        ))
      ) : (
        <div>Carrello vuoto</div>
      )}
    </Container>
  );
};

export default History;
