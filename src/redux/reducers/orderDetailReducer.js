import { GET_ALL_DETAIL_BY_ORDER, GET_ORDER, SET_MENU_PRICE } from "../actions";

const initialState = {
  byOrder: [],
  all: [],
  menuPrice: [16.9],
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

    case SET_MENU_PRICE:
      return {
        ...state,
        menuPrice: action.payload,
      };

    default:
      return state;
  }
};

export default orderDetailReducer;
