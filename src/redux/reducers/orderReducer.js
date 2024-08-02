import { GET_ALL_ORDER } from "../actions";

const initialState = {
  all: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ORDER:
      return {
        ...state,
        all: action.payload,
      };

    default:
      return state;
  }
};

export default orderReducer;
