import { useEffect, useState } from "react";
import { ButtonGroup, Container, ToggleButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const key = import.meta.env.VITE_PASSWORD;
  const password = localStorage.getItem("adminPassword");

  const navigate = useNavigate();
  const [getValue, setGetValue] = useState("/");
  // const [addValue, setAddValue] = useState("/orders");

  const getFunctions = [
    { name: "Ordini", value: "/" },
    { name: "Tavoli", value: "/tables" },
    { name: "Prodotti", value: "/products" },
  ];

  useEffect(() => {
    if (key !== password) {
      navigate("/menu");
    }
  }, []);

  return (
    <Container>
      <ButtonGroup>
        {getFunctions.map((get, idx) => (
          <ToggleButton
            key={idx}
            id={`get-${idx}`}
            type="radio"
            // variant={idx % 2 ? "outline-primary" : "outline-danger"}
            variant="outline-primary"
            value={get.value}
            checked={getValue === get.value}
            onChange={(e) => {
              setGetValue(e.currentTarget.value);
              navigate(e.currentTarget.value);
            }}
          >
            {get.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </Container>
  );
};
export default Home;
