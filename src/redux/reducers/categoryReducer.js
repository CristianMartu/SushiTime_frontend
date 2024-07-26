import { ACTIVE_CATEGORY, CATEGORY_NAME, GET_ALL_CATEGORY } from "../actions";

const initialState = {
  all: [],
  name: "",
  id: null,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORY:
      return {
        ...state,
        all: action.payload,
      };

    case CATEGORY_NAME:
      return {
        ...state,
        name: action.payload,
      };

    case ACTIVE_CATEGORY:
      return {
        ...state,
        id: action.payload,
      };
    default:
      return state;
  }
};

export default categoryReducer;
