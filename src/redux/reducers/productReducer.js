import { ADD_PRODUCT, REMOVE_PRODUCT } from "../actions";

const initialState = {
  content: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        content: [...state.content, action.payload],
      };

    case REMOVE_PRODUCT:
      return {
        ...state,
        content: state.content.filter(
          (product) => product.id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default productReducer;
