import { GET_ALL_ORDER, GET_ALL_ORDER_STATE, SET_ID } from "../actions";

const initialState = {
  all: [],
  id: null,
  allByState: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ORDER:
      return {
        ...state,
        all: action.payload,
      };

    case GET_ALL_ORDER_STATE:
      return {
        ...state,
        allByState: action.payload,
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
