export const GET_ORDER = "GET_ORDER";

const token = localStorage.getItem("authToken");

const urlBase = "http://localhost:3001";
const orderId = "84342983-1a44-485c-ba97-7b03f69c1281";

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

export const ADD_PRODUCT = " ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const EMPTY_SAVE_PRODUCT = "EMPTY_SAVE_PRODUCT";

export const removeProduct = (payload) => ({
  type: REMOVE_PRODUCT,
  payload,
});

export const addProduct = (payload) => ({
  type: ADD_PRODUCT,
  payload,
});

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
        throw new Error("Failed to save order details");
      }
      //const data = await response.json();
      dispatch({ type: EMPTY_SAVE_PRODUCT });
    } catch (error) {
      console.log("error", error);
      //dispatch({ type: 'SAVE_ORDER_DETAILS_FAILURE', payload: error.message });
    }
  };
};

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
        throw new Error("Failed to save order details");
      }
      const data = await response.json();
      dispatch({ type: "GET_ALL_DETAIL_BY_ORDER", payload: data });
    } catch (error) {
      console.log("error", error);
    }
  };
};
