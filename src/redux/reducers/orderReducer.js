import { GET_ORDER } from "../actions";

const initialState = {
  content: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER:
      return {
        ...state,
        content: action.payload,
      };
    default:
      return state;
  }
};

export default orderReducer;
