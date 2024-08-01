import { EMPTY_ERROR_DETAILS, ERROR_DETAILS } from "../actions";

const initialState = {
  message: null,
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERROR_DETAILS:
      return {
        ...state,
        message: action.payload,
      };

    case EMPTY_ERROR_DETAILS:
      return {
        ...state,
        message: null,
      };

    default:
      return state;
  }
};

export default errorReducer;
