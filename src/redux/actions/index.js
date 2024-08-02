export const GET_ORDER = "GET_ORDER";

const token = localStorage.getItem("authToken");

const urlBase = "http://localhost:3001";
const orderId = "84342983-1a44-485c-ba97-7b03f69c1281";

// GET SINGLE ORDER

const URL_ORDER = `${urlBase}/orders/${orderId}`;

export const getOrder = () => {
  return async (dispatch, getState) => {
    console.log("GET STATE", getState());
    try {
      let response = await fetch(URL_ORDER, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        let data = await response.json();
        dispatch({ type: GET_ORDER, payload: data });
      } else {
        throw new Error("Errore nella fetch ");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
};

// GET ALL CATEGORY

export const GET_ALL_CATEGORY = "GET_ALL_CATEGORY";
export const CATEGORY_NAME = "CATEGORY_NAME";
export const ACTIVE_CATEGORY = "ACTIVE_CATEGORY";

export const getAllCategory = (payload) => ({
  type: GET_ALL_CATEGORY,
  payload,
});

export const setCategoryName = (payload) => ({ type: CATEGORY_NAME, payload });

export const setActiveCategory = (payload) => ({
  type: ACTIVE_CATEGORY,
  payload,
});

const URL_ALL_CATEGORY = `${urlBase}/categories?size=50`;

export const getCategories = () => {
  return async (dispatch, getState) => {
    console.log("GET STATE", getState());
    try {
      let response = await fetch(URL_ALL_CATEGORY, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        let data = await response.json();
        dispatch(getAllCategory(data));
      } else {
        throw new Error("Errore nella fetch ");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
};

// SAVE ORDER DETAIL

export const ADD_PRODUCT = " ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const EMPTY_SAVE_PRODUCT = "EMPTY_SAVE_PRODUCT";
export const ERROR_DETAILS = "ERROR_DETAILS";
export const EMPTY_ERROR_DETAILS = "EMPTY_ERROR_DETAILS";

export const removeProduct = (payload) => ({
  type: REMOVE_PRODUCT,
  payload,
});

export const addProduct = (payload) => ({
  type: ADD_PRODUCT,
  payload,
});

export const handleError = (payload) => ({
  type: ERROR_DETAILS,
  payload,
});

export const emptyErrorDetails = () => ({ type: EMPTY_ERROR_DETAILS });

const URL_DETAIL_BY_ORDER = `${urlBase}/orders/${orderId}/details?size=50`;

export const saveOrderDetails = (products) => {
  return async (dispatch, getState) => {
    console.log("GET STATE", getState());
    try {
      let response = await fetch(URL_DETAIL_BY_ORDER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(products),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      // const data = await response.json();
      dispatch({ type: EMPTY_SAVE_PRODUCT });
    } catch (error) {
      console.log(error.message);
      dispatch(handleError(error.message));
    }
  };
};

// GET ALL ORDER DETAIL BY ORDER

export const GET_ALL_DETAIL_BY_ORDER = "GET_ALL_DETAIL_BY_ORDER";

export const getAllDetailByOrder = () => {
  return async (dispatch, getState) => {
    console.log("GET STATE", getState());
    try {
      let response = await fetch(URL_DETAIL_BY_ORDER, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Errore nell'ottenere i dettagli dell'ordine");
      }
      const data = await response.json();
      dispatch({ type: "GET_ALL_DETAIL_BY_ORDER", payload: data });
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const SET_MENU_PRICE = "SET_MENU_PRICE";

export const setMenuPrice = (payload) => ({ type: SET_MENU_PRICE, payload });

// GET ALL ORDER

export const URL_ALL_ORDER = `${urlBase}/orders`;
export const GET_ALL_ORDER = "GET_ALL_ORDER";

export const getAllOrder = (payload) => ({ type: GET_ALL_ORDER, payload });

export const fetchAllOrder = () => {
  return async (dispatch, getState) => {
    console.log("GET STATE", getState());
    try {
      let response = await fetch(URL_ALL_ORDER, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const data = await response.json();
      dispatch(getAllOrder(data));
    } catch (error) {
      console.log(error.message);
    }
  };
};

// GET ALL TABLE
export const URL_ALL_TABLE = `${urlBase}/tables`;
export const GET_ALL_TABLE = "GET_ALL_TABLE";

export const getAllTable = (payload) => ({ type: GET_ALL_TABLE, payload });

export const fetchAllTable = () => {
  return async (dispatch, getState) => {
    console.log("GET STATE", getState());
    try {
      let response = await fetch(URL_ALL_TABLE, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const data = await response.json();
      dispatch(getAllTable(data));
    } catch (error) {
      console.log(error.message);
    }
  };
};

// GET ALL PRODUCT
export const URL_ALL_PRODUCT = `${urlBase}/products?size=20&sortBy=number&page=`;
export const GET_ALL_PRODUCT = "GET_ALL_PRODUCT";

export const getAllProduct = (payload) => ({ type: GET_ALL_PRODUCT, payload });

export const fetchAllProduct = (page) => {
  return async (dispatch, getState) => {
    console.log("GET STATE", getState());
    try {
      let response = await fetch(URL_ALL_PRODUCT + page, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const data = await response.json();
      dispatch(getAllProduct(data));
    } catch (error) {
      console.log(error.message);
    }
  };
};
