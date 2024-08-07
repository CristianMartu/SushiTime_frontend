const token = localStorage.getItem("authToken");

const urlBase = "http://localhost:3001";

// GET SINGLE ORDER

export const GET_ORDER = "GET_ORDER";
export const SET_ID = "SET_ID";

export const setId = (payload) => ({ type: SET_ID, payload });

// const orderId = "84342983-1a44-485c-ba97-7b03f69c1281";
// const URL_ORDER = `${urlBase}/orders/${orderId}`;
const URL_ORDER = `${urlBase}/orders/`;

export const getOrder = (orderId) => {
  return async (dispatch, getState) => {
    console.log("getOrder", getState());
    try {
      const response = await fetch(URL_ORDER + orderId, {
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
      dispatch({ type: GET_ORDER, payload: data });
    } catch (error) {
      console.log(error);
      dispatch(handleError(error.message));
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
    console.log("getCategories", getState());
    try {
      const response = await fetch(URL_ALL_CATEGORY, {
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
      dispatch(getAllCategory(data));
    } catch (error) {
      console.log(error);
      dispatch(handleError(error.message));
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

export const emptySaveProduct = () => ({ type: EMPTY_SAVE_PRODUCT });
export const emptyErrorDetails = () => ({ type: EMPTY_ERROR_DETAILS });

// const URL_DETAIL_BY_ORDER = `${urlBase}/orders/${orderId}/details?size=50`;

export const saveOrderDetails = (products, orderId) => {
  return async (dispatch, getState) => {
    console.log("saveOrderDetails", getState());
    try {
      const response = await fetch(
        `${urlBase}/orders/${orderId}/details?size=50`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(products),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      dispatch(emptySaveProduct());
    } catch (error) {
      console.log(error);
      dispatch(handleError(error.message));
    }
  };
};

export const GET_ALL_ORDER_DETAIL = "GET_ALL_ORDER_DETAIL";
export const getAllOrderDetail = (payload) => ({
  type: GET_ALL_ORDER_DETAIL,
  payload,
});

// GET ALL ORDER DETAIL
export const fetchAllOrderDetail = (page = 0) => {
  return async (dispatch, getState) => {
    console.log("getAllOrderDetail", getState());
    try {
      const response = await fetch(
        `${urlBase}/orders/details/state?page=${page}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const data = await response.json();
      dispatch({ type: "GET_ALL_ORDER_DETAIL", payload: data });
    } catch (error) {
      console.log(error);
      dispatch(handleError(error.message));
    }
  };
};

// GET ALL ORDER DETAIL BY ORDER
export const GET_ALL_DETAIL_BY_ORDER = "GET_ALL_DETAIL_BY_ORDER";

export const getAllDetailByOrder = (orderId) => {
  return async (dispatch, getState) => {
    console.log("getAllDetailByOrder", getState());
    try {
      const response = await fetch(
        `${urlBase}/orders/${orderId}/details?size=20`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const data = await response.json();
      dispatch({ type: "GET_ALL_DETAIL_BY_ORDER", payload: data });
    } catch (error) {
      console.log(error);
      dispatch(handleError(error.message));
    }
  };
};

// POST ORDER DETAIL
export const fetchUpdateOrderDetail = (payload, orderDetailId, page = 0) => {
  return async (dispatch, getState) => {
    console.log("getAllDetailByOrder", getState());
    try {
      const response = await fetch(`${urlBase}/orders/order/${orderDetailId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const data = await response.json();
      dispatch({ type: "GET_ALL_DETAIL_BY_ORDER", payload: data });
      dispatch(fetchAllOrderDetail(page));
    } catch (error) {
      console.log(error);
      dispatch(handleError(error.message));
    }
  };
};

// GET ALL ORDER
export const URL_ALL_ORDER = `${urlBase}/orders?page=`;
export const URL_ALL_ORDER_STATE = `${urlBase}/orders/state?sortBy=table.number&page=`;
export const GET_ALL_ORDER = "GET_ALL_ORDER";
export const GET_ALL_ORDER_STATE = "GET_ALL_ORDER_STATE";

export const getAllOrder = (payload) => ({ type: GET_ALL_ORDER, payload });
export const getAllOrderState = (payload) => ({
  type: GET_ALL_ORDER_STATE,
  payload,
});

export const fetchAllOrder = (page = 0) => {
  return async (dispatch, getState) => {
    console.log("fetchAllOrder", getState());
    try {
      let response = await fetch(URL_ALL_ORDER + page, {
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
      console.log(error);
      dispatch(handleError(error.message));
    }
  };
};

export const fetchAllOrderState = (page = 0) => {
  return async (dispatch, getState) => {
    console.log("fetchAllOrderState", getState());
    try {
      let response = await fetch(URL_ALL_ORDER_STATE + page, {
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
      dispatch(getAllOrderState(data));
    } catch (error) {
      console.log(error);
      dispatch(handleError(error.message));
    }
  };
};

// POST ORDER
export const fetchOrder = (payload) => {
  return async (dispatch, getState) => {
    console.log("fetchSaveOrder", getState());
    try {
      let response = await fetch(URL_ALL_ORDER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const data = await response.json();
      dispatch(setId(data.id));
      dispatch(fetchAllOrder());
      dispatch(fetchAllOrderState());
      dispatch(fetchAllTable());
      dispatch(fetchAllTableState());
    } catch (error) {
      console.log(error);
      dispatch(handleError(error.message));
    }
  };
};

// CHANGE STATE ORDER
export const fetchChangeStateOrder = (payload, orderId) => {
  return async (dispatch, getState) => {
    console.log("fetchAllOrder", getState());
    try {
      let response = await fetch(`${urlBase}/orders/${orderId}/state`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      dispatch(fetchAllOrder());
      dispatch(fetchAllOrderState());
      dispatch(fetchAllTable());
      dispatch(fetchAllTableState());
    } catch (error) {
      console.log(error);
      dispatch(handleError(error.message));
    }
  };
};

// GET ALL TABLE
export const URL_ALL_TABLE = `${urlBase}/tables?size=15&page=`;
export const URL_ALL_TABLE_STATE = `${urlBase}/tables/state?size=15&page=`;
export const GET_ALL_TABLE = "GET_ALL_TABLE";
export const GET_ALL_TABLE_STATE = "GET_ALL_TABLE_STATE";

export const getAllTable = (payload) => ({ type: GET_ALL_TABLE, payload });
export const getAllTableState = (payload) => ({
  type: GET_ALL_TABLE_STATE,
  payload,
});

export const fetchAllTable = (page = 0) => {
  return async (dispatch, getState) => {
    console.log("fetchAllTable", getState());
    try {
      let response = await fetch(URL_ALL_TABLE + page, {
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
      console.log(error);
      dispatch(handleError(error.message));
    }
  };
};

export const fetchAllTableState = (page = 0) => {
  return async (dispatch, getState) => {
    console.log("fetchAllTableState", getState());
    try {
      let response = await fetch(URL_ALL_TABLE_STATE + page, {
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
      dispatch(getAllTableState(data));
    } catch (error) {
      console.log(error);
      dispatch(handleError(error.message));
    }
  };
};

// POST TABLE
export const fetchSaveTable = (payload) => {
  return async (dispatch, getState) => {
    console.log("fetchSaveTable", getState());
    try {
      let response = await fetch(`${urlBase}/tables`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      dispatch(fetchAllTable());
      dispatch(fetchAllTableState());
    } catch (error) {
      console.log(error);
      dispatch(handleError(error.message));
    }
  };
};

// PATCH TABLE
export const fetchPatchTable = (payload, tableId) => {
  return async (dispatch, getState) => {
    console.log("fetchSaveTable", getState());
    try {
      let response = await fetch(`${urlBase}/tables/${tableId}/number`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      dispatch(fetchAllTable());
      dispatch(fetchAllTableState());
    } catch (error) {
      console.log(error);
      dispatch(handleError(error.message));
    }
  };
};

// PATCH TABLE STATE
export const fetchPatchTableState = (payload, tableId) => {
  return async (dispatch, getState) => {
    console.log("fetchSaveTable", getState());
    try {
      let response = await fetch(`${urlBase}/tables/${tableId}/state`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      dispatch(fetchAllTable());
      dispatch(fetchAllTableState());
    } catch (error) {
      console.log(error);
      dispatch(handleError(error.message));
    }
  };
};

// DELETE TABLE
export const fetchDeleteTable = (tableId) => {
  return async (dispatch, getState) => {
    console.log("fetchSaveTable", getState());
    try {
      let response = await fetch(`${urlBase}/tables/${tableId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      dispatch(fetchAllTable());
      dispatch(fetchAllTableState());
    } catch (error) {
      console.log(error);
      dispatch(handleError(error.message));
    }
  };
};

// GET ALL PRODUCT
export const URL_ALL_PRODUCT = `${urlBase}/products?size=20&sortBy=number&page=`;
export const GET_ALL_PRODUCT = "GET_ALL_PRODUCT";

export const getAllProduct = (payload) => ({ type: GET_ALL_PRODUCT, payload });

export const fetchAllProduct = (page) => {
  return async (dispatch, getState) => {
    console.log("fetchAllProduct", getState());
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
      console.log(error);
      dispatch(handleError(error.message));
    }
  };
};
