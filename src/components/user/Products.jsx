import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import { FaMinus } from "react-icons/fa";
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
      } else {
        alert("Errore nella fetch");
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
    <Grid container spacing={3}>
      {menu.content.map((product) => {
        const selectedProduct = saveAddProduct.filter(
          (p) => p.id === product.id
        );
        const quantity = selectedProduct ? selectedProduct.length : 0;
        const imageUrl = product.image.startsWith("http")
          ? product.image
          : "https://thecryptogateway.it/wp-content/uploads/sushiswapLogo.jpg";

        return (
          <Grid item key={product.id} xs={12} md={6} lg={4} xl={3}>
            <Card
              sx={{
                width: "240px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderColor: isSaved(product.id)
                  ? "common.darkRed"
                  : "secondary.main",
                backgroundColor: "common.white",
                borderWidth: 2,
                borderStyle: "solid",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: 3,
                marginInlineStart: "20px",
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" gutterBottom>
                  {product.number} - {product.name}
                </Typography>
                <Typography variant="body1">{product.description}</Typography>
                <Typography variant="h6" color="primary" sx={{ mt: "auto" }}>
                  {getProductPrice(product.category.name, product.price)}
                </Typography>
              </CardContent>
              <CardMedia
                component="img"
                image={imageUrl}
                alt={product.name}
                sx={{ height: 140, objectFit: "contain" }}
              />
              <CardActions
                sx={{
                  justifyContent: "space-between",
                  padding: "8px 16px",
                  backgroundColor: isSaved(product.id)
                    ? "common.darkRed"
                    : "secondary.main",
                }}
              >
                <IconButton
                  color="white"
                  onClick={() => {
                    if (isSaved(product.id)) {
                      dispatch(removeProduct(product.id));
                    }
                  }}
                >
                  <FaMinus />
                </IconButton>
                <Typography
                  variant="h6"
                  color={isSaved(product.id) ? "common.vanilla" : "white"}
                >
                  {quantity}
                </Typography>
                <IconButton
                  color="white"
                  onClick={() => {
                    dispatch(addProduct(product));
                  }}
                >
                  <TiPlus />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  ) : (
    <Typography>Nessun risultato</Typography>
  );
};

export default Products;
