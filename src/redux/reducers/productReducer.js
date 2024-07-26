import { ADD_PRODUCT } from "../actions";

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
    default:
      return state;
  }
};

export default productReducer;
