import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Pagination, Table } from "react-bootstrap";
import { fetchAllProduct } from "../../redux/actions";

const Product = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.product.all);

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    dispatch(fetchAllProduct(currentPage));
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationItems = () => {
    const items = [];
    for (let number = 0; number < data.page.totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageChange(number)}
        >
          {number + 1}
        </Pagination.Item>
      );
    }
    return items;
  };

  return (
    <Container>
      <h3 className="my-3">
        Prodotti totali: {data.page && data.page.totalElements}
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
            <th>Numero</th>
            <th>Nome</th>
            <th>Descrizione</th>
            <th>Prezzo</th>
            <th>Url immagine</th>
            <th>Categoria</th>
          </tr>
        </thead>
        <tbody>
          {data.content &&
            data.content.map((product) => (
              <tr key={product.id}>
                <td>{product.number}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.image}</td>
                <td>{product.category.name}</td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Pagination>{data.page && renderPaginationItems()}</Pagination>
    </Container>
  );
};
export default Product;
