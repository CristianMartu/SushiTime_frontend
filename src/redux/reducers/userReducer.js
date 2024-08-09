import { ALL_USER, CURRENT_USER } from "../actions";

const initialState = {
  currentUser: [],
  all: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };

    case ALL_USER:
      return {
        ...state,
        all: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
