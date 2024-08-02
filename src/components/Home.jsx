import { useEffect, useState } from "react";
import { ButtonGroup, Container, ToggleButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const key = import.meta.env.VITE_PASSWORD;
  const password = localStorage.getItem("adminPassword");

  const navigate = useNavigate();
  const [radioValue, setRadioValue] = useState("/orders");

  const radios = [
    { name: "Ordini", value: "/orders" },
    { name: "Tavoli", value: "/tables" },
    { name: "Prodotti", value: "/products" },
    { name: "Menu", value: "/" },
  ];

  useEffect(() => {
    if (key !== password) {
      navigate("/");
    }
  }, []);

  return (
    <Container>
      <ButtonGroup>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            // variant={idx % 2 ? "outline-primary" : "outline-danger"}
            variant="outline-primary"
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => {
              setRadioValue(e.currentTarget.value);
              navigate(e.currentTarget.value);
            }}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </Container>
  );
};
export default Home;
