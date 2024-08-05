import { GET_ALL_ORDER, SET_ID } from "../actions";

const initialState = {
  all: [],
  id: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ORDER:
      return {
        ...state,
        all: action.payload,
      };

    case SET_ID:
      return {
        ...state,
        id: action.payload,
      };

    default:
      return state;
  }
};

export default orderReducer;
