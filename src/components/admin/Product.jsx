import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Form, Modal, Table } from "react-bootstrap";
import {
  fetchAllProduct,
  fetchDeleteProduct,
  fetchPutProduct,
  fetchSaveProduct,
} from "../../redux/actions";
import CustomPagination from "../CustomPagination";

const Product = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.product.all);

  const [showModal, setShowModal] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [attProduct, setAttProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    number: "",
    category: "",
  });

  const [attProductView, setAttProductView] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    number: "",
    category: "",
    id: "",
  });

  const handleCloseModal = () => {
    setShowModal(false);
    setTimeout(() => {
      setShowModalUpdate(false);
      setAttProduct({
        name: "",
        description: "",
        price: "",
        image: "",
        number: "",
        category: "",
      });
      setAttProductView({
        name: "",
        description: "",
        price: "",
        image: "",
        number: "",
        category: "",
        id: "",
      });
    }, 150);
  };

  const handleChangeAttProduct = (e) => {
    const { id, value } = e.target;
    setAttProduct((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleCloseModal();
    if (showModalUpdate) {
      dispatch(fetchPutProduct(attProduct, attProductView.id, currentPage));
    } else dispatch(fetchSaveProduct(attProduct, currentPage));
  };

  const handleDelete = () => {
    handleCloseModal();
    dispatch(fetchDeleteProduct(attProductView.id, currentPage));
  };

  const [currentPage, setCurrentPage] = useState(0);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(fetchAllProduct(currentPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <>
      <Container>
        <h3 className="my-3">
          Prodotti totali: {data.page && data.page.totalElements}
        </h3>
        <Button className="mb-3" onClick={() => setShowModal(true)}>
          Aggiungi prodotto
        </Button>
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
                <tr
                  key={product.id}
                  onClick={() => {
                    setAttProductView({
                      name: product.name,
                      description: product.description,
                      price: product.price,
                      image: product.image,
                      number: product.number,
                      category: product.category.name,
                      id: product.id,
                    });
                    setShowModal(true);
                    setShowModalUpdate(true);
                  }}
                >
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

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <h3>{showModalUpdate ? "Modifica prodotto" : "Nuovo prodotto"}</h3>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder={
                  attProductView.name
                    ? attProductView.name
                    : "Inserisci un nome"
                }
                value={attProduct.name}
                onChange={handleChangeAttProduct}
                autoFocus={showModalUpdate ? false : true}
                required={showModalUpdate ? false : true}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Descrizione</Form.Label>
              <Form.Control
                type="text"
                placeholder={
                  attProductView.description
                    ? attProductView.description
                    : "Inserisci una descrizione"
                }
                value={attProduct.description}
                onChange={handleChangeAttProduct}
                required={showModalUpdate ? false : true}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Prezzo</Form.Label>
              <Form.Control
                type="number"
                min="0"
                step="0.01"
                placeholder={
                  attProductView.price
                    ? attProductView.price
                    : "Inserisci un prezzo"
                }
                value={attProduct.price}
                onChange={handleChangeAttProduct}
                required={showModalUpdate ? false : true}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Immagine URL</Form.Label>
              <Form.Control
                type="text"
                placeholder={
                  attProductView.image
                    ? attProductView.image
                    : "Inserisci un URL per l'immagine"
                }
                value={attProduct.image}
                onChange={handleChangeAttProduct}
                required={showModalUpdate ? false : true}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="number">
              <Form.Label>Numero</Form.Label>
              <Form.Control
                type="number"
                min="0"
                placeholder={
                  attProductView.number
                    ? attProductView.number
                    : "Inserisci un numero"
                }
                value={attProduct.number}
                onChange={handleChangeAttProduct}
                required={showModalUpdate ? false : true}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Categoria</Form.Label>
              <Form.Control
                type="text"
                placeholder={
                  attProductView.category
                    ? attProductView.category
                    : "Inserisci una categoria"
                }
                value={attProduct.category}
                onChange={handleChangeAttProduct}
                required={showModalUpdate ? false : true}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Annulla
            </Button>
            {showModalUpdate && (
              <Button variant="outline-danger" onClick={handleDelete}>
                Elimina
              </Button>
            )}
            <Button variant="primary" type="submit">
              {showModalUpdate ? "Modifica" : "Salva"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
export default Product;
