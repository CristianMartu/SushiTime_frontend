import { ADD_PRODUCT, EMPTY_SAVE_PRODUCT, REMOVE_PRODUCT } from "../actions";

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

    case REMOVE_PRODUCT: {
      const index = state.content.findIndex(
        (product) => product.id === action.payload
      );
      if (index !== -1) {
        const newContent = [...state.content];
        newContent.splice(index, 1);
        return {
          ...state,
          content: newContent,
        };
      }
      return state;
    }

    case EMPTY_SAVE_PRODUCT:
      return {
        ...state,
        content: [],
      };

    default:
      return state;
  }
};

export default productReducer;
