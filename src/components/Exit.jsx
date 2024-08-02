import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useSelector } from "react-redux";

const Exit = () => {
  const order = useSelector((state) => state.order.content);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const key = import.meta.env.VITE_PASSWORD;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== key) {
      setPasswordError("Password non valida.");
    } else {
      setPasswordError("");
      console.log("Prova invio");
    }
    setPassword("");
  };

  return (
    <Container className="my-4">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="table-number">
          <Form.Label>Numero del Tavolo:</Form.Label>
          <Form.Control
            type="text"
            value={order.table ? order.table.number : 0}
            readOnly
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isInvalid={!!passwordError}
            required
          />
          <Form.Control.Feedback type="invalid">
            {passwordError}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Invia
        </Button>
      </Form>
    </Container>
  );
};

export default Exit;
