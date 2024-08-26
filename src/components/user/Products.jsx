import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Grid,
  IconButton,
  Box,
  alpha,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  useTheme,
} from "@mui/material";
import { FaMinus } from "react-icons/fa";
import { TiPlus } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct } from "../../redux/actions";
import logo from "../../assets/logo.png";

const Products = ({ categoryName }) => {
  const token = localStorage.getItem("authToken");
  const URL = "http://localhost:3001/products/category?size=50";
  const theme = useTheme();

  const dispatch = useDispatch();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenDialog = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
  };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return (
    <>
      <Box
        sx={{
          height: "calc(100vh - 4rem)",
          overflowY: "auto",
          paddingBlock: "25px",
        }}
      >
        {menu ? (
          <Grid
            container
            rowSpacing={4}
            justifyContent={"start"}
            sx={{ paddingInlineStart: "3rem" }}
          >
            {menu.content.map((product) => {
              const selectedProduct = saveAddProduct.filter(
                (p) => p.id === product.id
              );
              const quantity = selectedProduct ? selectedProduct.length : 0;
              const imageUrl = product.image.startsWith("http")
                ? product.image
                : logo;
              return (
                <Grid item key={product.id} xs="auto">
                  <Card
                    sx={{
                      width: "240px",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderColor: isSaved(product.id)
                        ? "common.darkRed"
                        : "secondary.main",
                      boxShadow: isSaved(product.id)
                        ? `${alpha("#9b2226ff", 0.1)} 0px 4px 12px 2px`
                        : `0px 4px 8px rgba(0, 0, 0, 0.4)`,
                      backgroundColor: "common.contrast",
                      // backgroundColor: "common.white",
                      borderWidth: 2,
                      borderStyle: "solid",
                      borderRadius: "16px",
                      overflow: "hidden",
                      marginInlineStart: "20px",
                    }}
                  >
                    <CardContent
                      onClick={() => handleOpenDialog(product)}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        height: "100%",
                        paddingBlockEnd: 0,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", marginBlockEnd: 1 }}
                      >
                        {product.number.toString().padStart(3, "0")} -{" "}
                        {product.name}
                      </Typography>
                      <Box>
                        <Typography variant="body1" noWrap>
                          {product.description}
                        </Typography>
                        <Typography
                          variant="h6"
                          color={(theme) => theme.palette.common.darkRed}
                          sx={{ fontWeight: "bold" }}
                        >
                          {getProductPrice(
                            product.category.name,
                            product.price
                          )}
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardMedia
                      onClick={() => handleOpenDialog(product)}
                      component="img"
                      image={imageUrl}
                      alt={product.name}
                      sx={{
                        height: 140,
                        objectFit: "contain",
                        backgroundColor:
                          !product.image.startsWith("http") &&
                          theme.palette.common.black,
                      }}
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
          <></>
        )}
      </Box>
      {selectedProduct && (
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          // fullWidth
          // maxWidth={"sm"}
          maxWidth={"xs"}
        >
          <DialogTitle sx={{ fontWeight: "bold" }}>
            {selectedProduct.name}
          </DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              width: "350px",
            }}
          >
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              {selectedProduct.description}
            </Typography>
            <CardMedia
              component="img"
              image={
                selectedProduct.image.startsWith("http")
                  ? selectedProduct.image
                  : logo
              }
              alt={selectedProduct.name}
              sx={{
                width: "200px",
                height: "auto",
                objectFit: "contain",
                backgroundColor:
                  !selectedProduct.image.startsWith("http") &&
                  theme.palette.common.black,
              }}
            />
            <Typography variant="h6" sx={{ marginTop: 2 }}>
              Prezzo:{" "}
              {getProductPrice(
                selectedProduct.category.name,
                selectedProduct.price
              )}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseDialog}
              color="secondary"
              variant="contained"
            >
              Chiudi
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default Products;
