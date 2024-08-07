import { GET_ALL_TABLE, GET_ALL_TABLE_STATE } from "../actions";

const initialState = {
  all: [],
  allByState: [],
};

const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TABLE:
      return {
        ...state,
        all: action.payload,
      };

    case GET_ALL_TABLE_STATE:
      return {
        ...state,
        allByState: action.payload,
      };

    default:
      return state;
  }
};

export default tableReducer;
