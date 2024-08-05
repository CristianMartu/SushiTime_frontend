import { GET_ALL_DETAIL_BY_ORDER, GET_ORDER } from "../actions";

const initialState = {
  byOrder: [],
  all: [],
};

const orderDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER:
      return {
        ...state,
        byOrder: action.payload,
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

export default orderDetailReducer;
