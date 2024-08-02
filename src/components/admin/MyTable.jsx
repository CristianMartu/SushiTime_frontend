import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Table } from "react-bootstrap";
import { fetchAllTable } from "../../redux/actions";

const MyTable = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.table.all);

  useEffect(() => {
    dispatch(fetchAllTable());
  }, []);

  return (
    <Container>
      <h3 className="my-3">
        Tavoli totali: {data.page && data.page.totalElements}
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
            <th>Numero tavolo</th>
            <th>Massima capacità</th>
            <th>Persone correnti</th>
            <th>Stato ordine</th>
          </tr>
        </thead>
        <tbody>
          {data.content &&
            data.content.map((table) => (
              <tr key={table.id}>
                <td>{table.number}</td>
                <td>{table.maxCapacity}</td>
                <td>{table.currentPeople}</td>
                <td>{table.state}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};
export default MyTable;
