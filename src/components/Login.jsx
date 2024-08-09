import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchLogin, handleError } from "../redux/actions";

const Login = () => {
  const dispatch = useDispatch();

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
      window.location.href = "/orders";
      // navigate("/");
    } catch (err) {
      setLogin({
        email: login.email,
        password: "",
      });
      dispatch(handleError(err.message));
    }
  };

  useEffect(() => {
    localStorage.setItem("authToken", null);
  }, []);

  return (
    <Container
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ maxWidth: 380 }}
    >
      <div className="w-100">
        <h3 className="text-center">Accedi</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="nome.cognome@gmail.com"
              value={login.email}
              onChange={handleChangeLogin}
              autoFocus
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="inserire una password"
              value={login.password}
              onChange={handleChangeLogin}
              required
            />
          </Form.Group>
          <div className="text-end">
            <Button variant="primary" type="submit">
              Invio
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default Login;
