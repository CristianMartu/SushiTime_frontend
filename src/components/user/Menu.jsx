import { useEffect, useState } from "react";
import { Container, Button, Typography, ListItem } from "@mui/material";
import Products from "./Products";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  setActiveCategory,
  setCategoryName,
} from "../../redux/actions";
import { StyledList, StyledListItemMenu } from "../../style/style";

const Menu = () => {
  localStorage.setItem("adminPassword", "");
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category.all);
  const name = useSelector((state) => state.category.name);
  const activeCategory = useSelector((state) => state.category.id);

  const [menuType, setMenuType] = useState("");

  useEffect(() => {
    dispatch(getCategories());

    const now = new Date();
    const hours = now.getHours();

    if (hours >= 9 && hours < 17) {
      setMenuType("Menu Pranzo");
    } else {
      setMenuType("Menu Cena");
    }
  }, [dispatch]);

  return (
    <div style={{ display: "flex", backgroundColor: "#071535" }}>
      <StyledList>
        <ListItem
          sx={{
            justifyContent: "center",
          }}
        >
          <Button variant="contained" color="secondary" disableRipple>
            {menuType}
          </Button>
        </ListItem>
        {category.content ? (
          category.content.map((element) => (
            <StyledListItemMenu
              key={element.id}
              isActive={
                activeCategory === null
                  ? category.content[0].id === element.id
                  : activeCategory === element.id
              }
              onClick={() => {
                dispatch(setCategoryName(element.name));
                dispatch(setActiveCategory(element.id));
              }}
            >
              <Typography>{element.name}</Typography>
            </StyledListItemMenu>
          ))
        ) : (
          <Typography sx={{ textAlign: "center", padding: "1rem" }}>
            Nessun risultato
          </Typography>
        )}
      </StyledList>

      <Container sx={{ marginBlockStart: 3 }}>
        {category.content ? (
          <Products categoryName={name || category.content[0]?.name} />
        ) : (
          <Typography>Nessun risultato</Typography>
        )}
      </Container>
    </div>
  );
};

export default Menu;
