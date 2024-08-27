import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProduct,
  fetchDeleteProduct,
  fetchPutProduct,
  fetchSaveProduct,
} from "../../redux/actions";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { StyledTableCell, TablePaper } from "../../style/style";
import CustomTablePagination from "../CustomTablePagination";

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

  const [imageFile, setImageFile] = useState(null);
  const [, setFileName] = useState("");
  const handleFileChange = (event) => {
    setImageFile(event.target.files[0]);
    if (event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTimeout(() => {
      setShowModalUpdate(false);
      setAttProduct({
        name: "",
        description: "",
        price: "",
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
    const formData = new FormData();
    formData.append("product", JSON.stringify(attProduct));
    if (imageFile) {
      formData.append("image", imageFile);
    }
    if (showModalUpdate) {
      dispatch(fetchPutProduct(formData, attProductView.id, currentPage));
    } else dispatch(fetchSaveProduct(formData, currentPage));
  };

  const handleDelete = () => {
    handleCloseModal();
    dispatch(fetchDeleteProduct(attProductView.id, currentPage));
  };

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(fetchAllProduct(currentPage, rowsPerPage));
  }, [currentPage, dispatch, rowsPerPage]);

  return (
    <Box sx={{ height: "calc(100vh - 4rem)", overflow: "auto" }}>
      <Container
        maxWidth="lg"
        sx={{
          paddingBlock: "1rem",
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setShowModal(true)}
          sx={{ marginBlockEnd: 1 }}
        >
          <Typography variant="h6">Aggiungi prodotto</Typography>
        </Button>
        {data.page && data.page.totalElements > 0 && (
          <TablePaper>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        Numero
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        Nome
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        Descrizione
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        Prezzo
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        Categoria
                      </Typography>
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.content &&
                    data.content.map((product) => (
                      <TableRow
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
                        hover
                      >
                        <StyledTableCell align="center">
                          <Typography>{product.number}</Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                          <Typography>{product.name}</Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                          <Typography>{product.description}</Typography>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Typography>{product.price} &euro;</Typography>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Typography>{product.category.name}</Typography>
                        </StyledTableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <CustomTablePagination
              totalPages={data.page.totalElements}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          </TablePaper>
        )}
      </Container>

      <Dialog
        open={showModal}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="sm"
        // disableEscapeKeyDown
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle variant="h5">
            {showModalUpdate ? "Modifica prodotto" : "Nuovo prodotto"}
          </DialogTitle>
          <DialogContent dividers>
            <TextField
              autoFocus={!showModalUpdate}
              margin="dense"
              id="name"
              label="Nome"
              type="text"
              fullWidth
              value={attProduct.name}
              onChange={handleChangeAttProduct}
              placeholder={attProductView.name || "Inserisci un nome"}
              InputLabelProps={{ shrink: showModalUpdate ? true : undefined }}
              required={!showModalUpdate}
            />
            <TextField
              margin="dense"
              id="description"
              label="Descrizione"
              type="text"
              fullWidth
              value={attProduct.description}
              onChange={handleChangeAttProduct}
              placeholder={
                attProductView.description || "Inserisci una descrizione"
              }
              InputLabelProps={{ shrink: showModalUpdate ? true : undefined }}
              required={!showModalUpdate}
            />
            <TextField
              margin="dense"
              id="price"
              label="Prezzo"
              type="number"
              fullWidth
              value={attProduct.price}
              onChange={handleChangeAttProduct}
              placeholder={
                attProductView.price?.toString() || "Inserisci un prezzo"
              }
              InputLabelProps={{ shrink: showModalUpdate ? true : undefined }}
              inputProps={{ min: 0, step: 0.01 }}
              required={!showModalUpdate}
            />
            <label htmlFor="contained-button-file">
              <Typography
                component="span"
                variant="primary"
                marginInlineEnd={1}
              >
                {!showModalUpdate ? "Carica Immagine" : "Immagine attuale"}
              </Typography>
              {showModalUpdate && (
                <img
                  src={attProductView.image}
                  alt={"product image"}
                  style={{
                    objectFit: "contain",
                    backgroundSize: "cover",
                    maxWidth: "70px",
                    marginInlineEnd: "0.5rem",
                    marginBlock: 1,
                  }}
                />
              )}
              <Input
                accept="image/*"
                id="contained-button-file"
                type="file"
                onChange={handleFileChange}
              />
            </label>
            <TextField
              margin="dense"
              id="number"
              label="Numero"
              type="number"
              fullWidth
              value={attProduct.number}
              onChange={handleChangeAttProduct}
              placeholder={
                attProductView.number?.toString() || "Inserisci un numero"
              }
              InputLabelProps={{ shrink: showModalUpdate ? true : undefined }}
              inputProps={{ min: 0 }}
              required={!showModalUpdate}
            />
            <TextField
              margin="dense"
              id="category"
              label="Categoria"
              type="text"
              fullWidth
              value={attProduct.category}
              onChange={handleChangeAttProduct}
              placeholder={attProductView.category || "Inserisci una categoria"}
              InputLabelProps={{ shrink: showModalUpdate ? true : undefined }}
              required={!showModalUpdate}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              Annulla
            </Button>
            {showModalUpdate && (
              <Button onClick={handleDelete} color="error" variant="outlined">
                Elimina
              </Button>
            )}
            <Button type="submit" variant="contained" color="primary">
              {showModalUpdate ? "Modifica" : "Salva"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};
export default Product;
