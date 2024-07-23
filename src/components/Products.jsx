import { useEffect, useState } from "react";
import { Card, CardFooter, CardText, Col } from "react-bootstrap";

const Products = ({ categoryName }) => {
  const myKey =
    "eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3MjE3MjM1MjMsImV4cCI6MTcyMjMyODMyMywic3ViIjoiMmYyNDE5MzQtMGYyNS00M2I2LTg1ZTQtNGZjMzcwYmQ5YjcyIn0.EUNt42jE55VGjtzI5_raSTMt_vGQeXZ357-j1z6Jy1n9cUsG1LIaD5hdaFaDU4zYkkyRwzFPQdWL-UMd9sQ7VQ";

  const URL = "http://localhost:3001/products/category?size=50";

  const payload = {
    name: categoryName,
  };

  const [menu, setMenu] = useState();

  const menuFetch = async () => {
    console.log(categoryName);
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myKey}`,
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const data = await response.json();
        setMenu(data);
        console.log(data);
      } else {
        alert("Errore nella fetch ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    menuFetch();
  }, [categoryName]);

  return menu ? (
    menu.content.map((product) => (
      <Col key={product.id} className=" d-flex align-items-stretch">
        <Card style={{ width: "16rem", maxHeight: "600px" }}>
          <Card.Body>
            <Card.Title>
              {product.number} - {product.name}
            </Card.Title>
            <CardText>{product.description}</CardText>
            <CardText className="text-info">{product.price} €</CardText>
          </Card.Body>
          <Card.Img variant="top" src={product.image} />
          <CardFooter className="bg-info d-flex justify-content-between text-white fs-3">
            <i className="bi bi-dash-lg my-auto fs-2"></i>
            <div>0</div>
            <i className="bi bi-plus-lg my-auto fs-3"></i>
          </CardFooter>
        </Card>
      </Col>
    ))
  ) : (
    <div>Nessun risultato</div>
  );
};
export default Products;
