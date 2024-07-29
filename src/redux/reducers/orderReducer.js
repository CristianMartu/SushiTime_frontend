import { GET_ALL_DETAIL_BY_ORDER, GET_ORDER } from "../actions";

const initialState = {
  content: [],
  all: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER:
      return {
        ...state,
        content: action.payload,
      };

    case GET_ALL_DETAIL_BY_ORDER:
      return {
        ...state,
        all: action.payload,
      };

    default:
      return state;
  }
};

export default orderReducer;
