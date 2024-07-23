import { useEffect, useState } from "react";
import { Container, ListGroup, Row } from "react-bootstrap";
import Products from "./Products";

const Menu = () => {
  const myKey =
    "eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3MjE3MjM1MjMsImV4cCI6MTcyMjMyODMyMywic3ViIjoiMmYyNDE5MzQtMGYyNS00M2I2LTg1ZTQtNGZjMzcwYmQ5YjcyIn0.EUNt42jE55VGjtzI5_raSTMt_vGQeXZ357-j1z6Jy1n9cUsG1LIaD5hdaFaDU4zYkkyRwzFPQdWL-UMd9sQ7VQ";

  const URL = "http://localhost:3001/categories?size=50";

  const [category, setCategory] = useState();
  const [activeItem, setActiveItem] = useState(null);
  const [name, setName] = useState(null);

  const categoryFetch = async () => {
    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myKey}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCategory(data);
        console.log(data);
      } else {
        alert("Errore nella fetch ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    categoryFetch();
  }, []);

  return (
    <div className="d-flex">
      <ListGroup as="ul" style={{ width: "20rem" }}>
        {category ? (
          category.content.map((element, index) => (
            <ListGroup.Item
              as="li"
              key={element.id}
              variant="info"
              active={
                activeItem == null ? setActiveItem(0) : activeItem == index
              }
              onClick={() => {
                setActiveItem(index);
                setName(element.name);
              }}
            >
              {element.name}
            </ListGroup.Item>
          ))
        ) : (
          <div>Nessun risultato</div>
        )}
      </ListGroup>

      <Container className="my-4">
        <Row className="row-gap-3" style={{ height: "400px" }}>
          {category ? (
            <Products categoryName={name} />
          ) : (
            <div>Nessun risultato</div>
          )}
        </Row>
      </Container>
    </div>
  );
};
export default Menu;
