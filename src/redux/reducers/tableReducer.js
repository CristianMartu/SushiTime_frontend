import { GET_ALL_TABLE } from "../actions";

const initialState = {
  all: [],
};

const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TABLE:
      return {
        ...state,
        all: action.payload,
      };

    default:
      return state;
  }
};

export default tableReducer;
