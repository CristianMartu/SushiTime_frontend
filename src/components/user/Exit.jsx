import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { emptySaveProduct, handleError } from "../../redux/actions";
import {
  Button,
  Container,
  Box,
  useTheme,
  FormControl,
  InputLabel,
  InputBase,
} from "@mui/material";
import { BootstrapInput } from "../../style/style";

const Exit = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const order = useSelector((state) => state.orderDetail.byOrder);
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const key = import.meta.env.VITE_PASSWORD;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== key) {
      setPasswordError(true);
      dispatch(handleError("Password non valida."));
    } else {
      setPasswordError(false);
      dispatch(emptySaveProduct());
      localStorage.setItem("adminPassword", key);
      navigate("/orders");
    }
    setPassword("");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <FormControl variant="standard" fullWidth>
          <InputLabel
            shrink
            htmlFor="table-number-input"
            sx={{
              fontSize: 22,
              color: "secondary.main",
              "&.Mui-focused": {
                color: "secondary.main",
              },
            }}
          >
            Numero del Tavolo
          </InputLabel>
          <InputBase
            defaultValue={order.table ? order.table.number : 0}
            id="table-number-input"
            readOnly
            sx={{
              "label + &": {
                marginTop: theme.spacing(4),
              },
              "& .MuiInputBase-input": {
                borderRadius: "4px",
                backgroundColor: theme.palette.common.contrast,
                border: "1px solid",
                borderColor: theme.palette.secondary.main,
                color: theme.palette.text.dark,
                fontSize: 20,
                padding: "10px 12px",
              },
            }}
          />
        </FormControl>
        <FormControl variant="standard" fullWidth sx={{ marginTop: 3 }}>
          <InputLabel
            shrink
            htmlFor="password-input"
            sx={{
              fontSize: 22,
              color: passwordError
                ? theme.palette.error.main
                : "common.contrast",
              "&.Mui-focused": {
                color: passwordError
                  ? theme.palette.error.main
                  : theme.palette.secondary.main,
              },
            }}
          >
            Password
          </InputLabel>
          <BootstrapInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password-input"
            error={!!passwordError}
          />
        </FormControl>
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          sx={{
            mt: 3,
            fontSize: 18,
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.common.white,
            "&:hover": { backgroundColor: theme.palette.secondary.dark },
          }}
        >
          Invia
        </Button>
      </Box>
    </Container>
  );
};

export default Exit;
