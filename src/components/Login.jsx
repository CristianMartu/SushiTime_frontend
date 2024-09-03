import { useEffect, useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchLogin, handleError } from "../redux/actions";
import { StyledTextField } from "../style/style";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChangeLogin = (e) => {
    const { id, value } = e.target;
    setLogin((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await dispatch(fetchLogin(login));
      // window.location.href = "/orders";
      navigate("/orders");
    } catch (err) {
      setLogin((prevState) => ({
        ...prevState,
        password: "",
      }));
      dispatch(handleError(err.message));
    }
  };

  useEffect(() => {
    localStorage.setItem("authToken", null);
  }, []);

  return (
    <Box maxWidth={"380px"} marginInline={"auto"} marginBlockStart={"20vh"}>
      <Typography variant="h3" color={"secondary"} align="center" gutterBottom>
        Accedi
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <StyledTextField
          margin="dense"
          id="email"
          label="Email"
          type="text"
          fullWidth
          value={login.email}
          onChange={handleChangeLogin}
          isEditing={true}
          required
        />
        <StyledTextField
          margin="dense"
          id="password"
          label="Password"
          type="password"
          fullWidth
          value={login.password}
          onChange={handleChangeLogin}
          isEditing={true}
          required
        />
        <Box textAlign={"right"} marginBlockStart={"0.5rem"}>
          <Button variant="contained" color="secondary" type="submit">
            <Typography>Invio</Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
