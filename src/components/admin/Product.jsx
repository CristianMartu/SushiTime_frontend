import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Table } from "react-bootstrap";
import { fetchAllProduct } from "../../redux/actions";
import CustomPagination from "../CustomPagination";

const Product = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.product.all);

  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(fetchAllProduct(currentPage));
  }, [currentPage]);

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
      {data.page && data.page.totalPages > 1 && (
        <CustomPagination
          totalPages={data.page ? data.page.totalPages : 0}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </Container>
  );
};
export default Product;
