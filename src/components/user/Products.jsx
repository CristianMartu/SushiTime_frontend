import { useEffect, useState } from "react";
import { Card, CardFooter, CardText, Col } from "react-bootstrap";
import { FaMinus } from "react-icons/fa6";
import { TiPlus } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct } from "../../redux/actions";

const Products = ({ categoryName }) => {
  const token = localStorage.getItem("authToken");
  const URL = "http://localhost:3001/products/category?size=50";

  const dispatch = useDispatch();

  const payload = {
    name: categoryName,
  };

  const [menu, setMenu] = useState();

  const menuFetch = async () => {
    // console.log(categoryName);
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
        // console.log(data);
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

  const saveAddProduct = useSelector((state) => state.product.content);

  const isSaved = (id) =>
    saveAddProduct.findIndex((product) => product.id === id) !== -1;

  const validCategories = ["BEVANDE", "DOLCI", "BIRRE"];

  const getProductPrice = (name, price) => {
    if (validCategories.includes(name)) {
      return formatPrice(price);
    } else {
      return formatPrice(0);
    }
  };

  const formatPrice = (price, locale = "it-IT", currency = "EUR") => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(price);
  };

  return menu ? (
    menu.content.map((product) => {
      const selectedProduct = saveAddProduct.filter((p) => p.id === product.id);
      const quantity = selectedProduct ? selectedProduct.length : 0;
      const imageUrl = product.image.startsWith("http")
        ? product.image
        : "https://thecryptogateway.it/wp-content/uploads/sushiswapLogo.jpg";

      return (
        <Col key={product.id} className="d-flex align-items-stretch" xs="auto">
          <Card
            style={{ width: "16rem", maxHeight: "600px" }}
            border={isSaved(product.id) ? "danger" : "info"}
          >
            <Card.Body className="d-flex flex-column">
              <Card.Title>
                {product.number} - {product.name}
              </Card.Title>
              <CardText>{product.description}</CardText>
              <CardText className="text-info mt-auto">
                {getProductPrice(product.category.name, product.price)}
              </CardText>
            </Card.Body>
            <Card.Img
              variant="top"
              src={imageUrl}
              className="fixed-size-image"
            />
            <CardFooter
              className={
                isSaved(product.id)
                  ? "bg-danger d-flex justify-content-between text-white fs-3"
                  : "bg-info d-flex justify-content-between text-white fs-3"
              }
            >
              <FaMinus
                className="my-auto minus"
                onClick={() => {
                  if (isSaved(product.id)) {
                    dispatch(removeProduct(product.id));
                  }
                }}
              />
              <div>{quantity}</div>
              <TiPlus
                className="my-auto plus"
                onClick={() => {
                  dispatch(addProduct(product));
                }}
              />
            </CardFooter>
          </Card>
        </Col>
      );
    })
  ) : (
    <div>Nessun risultato</div>
  );
};
export default Products;
