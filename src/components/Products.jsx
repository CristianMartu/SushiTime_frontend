import { useEffect, useState } from "react";
import { Card, CardFooter, CardText, Col } from "react-bootstrap";
import { FaMinus } from "react-icons/fa6";
import { TiPlus } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/actions";

const Products = ({ categoryName }) => {
  const token = localStorage.getItem("authToken");
  const URL = "http://localhost:3001/products/category?size=50";

  const dispatch = useDispatch();

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
          Authorization: `Bearer ${token}`,
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

  // const [newAdd, setNewAdd] = useState({
  //   id: "",
  //   name: "",
  //   description: "",
  //   price: "",
  //   image: "",
  //   number: "",
  // });

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
            <FaMinus className="my-auto minus" />
            <div>0</div>
            <TiPlus
              className="my-auto plus"
              onClick={() => {
                console.log(product);
                // setNewAdd({
                //   id: product.id,
                //   name: product.namme,
                //   description: product.description,
                //   price: product.price,
                //   image: product.image,
                //   number: product.nummber,
                // });
                dispatch(addProduct(product));
              }}
            />
          </CardFooter>
        </Card>
      </Col>
    ))
  ) : (
    <div>Nessun risultato</div>
  );
};
export default Products;
