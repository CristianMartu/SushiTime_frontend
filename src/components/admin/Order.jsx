import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Table } from "react-bootstrap";
import { fetchAllOrder } from "../../redux/actions";

const Order = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.order.all);

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

  useEffect(() => {
    dispatch(fetchAllOrder());
  }, []);

  return (
    <Container>
      <h3 className="my-3">
        Ordini totali: {data.page && data.page.totalElements}
      </h3>
      <Table
        striped
        bordered
        hover
        variant="dark"
        className="text-center"
        responsive="sm"
      >
        <thead>
          <tr>
            <th>Data</th>
            <th>Stato</th>
            <th>Tavolo associato</th>
          </tr>
        </thead>
        <tbody>
          {data.content &&
            data.content.map((order) => (
              <tr key={order.id}>
                <td>{dateFormat(order.date)}</td>
                <td>{order.state}</td>
                <td>{order.table.number}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};
export default Order;
