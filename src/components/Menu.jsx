import { useEffect } from "react";
import { Container, ListGroup, Row } from "react-bootstrap";
import Products from "./Products";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  setActiveCategory,
  setCategoryName,
} from "../redux/actions";

const Menu = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category.all);
  const name = useSelector((state) => state.category.name);
  const activeCategory = useSelector((state) => state.category.id);

  useEffect(() => {
    dispatch(getCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="d-flex">
      <ListGroup as="ul" style={{ width: "20rem" }}>
        {category.content ? (
          category.content.map((element) => (
            <ListGroup.Item
              as="li"
              key={element.id}
              variant="info"
              active={
                activeCategory === null
                  ? category.content[0].id == element.id
                  : activeCategory == element.id
              }
              onClick={() => {
                dispatch(setCategoryName(element.name));
                dispatch(setActiveCategory(element.id));
              }}
            >
              {element.name}
            </ListGroup.Item>
          ))
        ) : (
          <div>Nessun risultato</div>
        )}
      </ListGroup>

      <Container className="my-4">
        <Row className="row-gap-3" style={{ height: "400px" }}>
          {category.content ? (
            <Products categoryName={name || category.content[0]?.name} />
          ) : (
            <div>Nessun risultato</div>
          )}
        </Row>
      </Container>
    </div>
  );
};
export default Menu;
