const token = localStorage.getItem("authToken");

const urlBase = "http://localhost:3001";

// GET SINGLE ORDER

export const GET_ORDER = "GET_ORDER";
export const SET_ID = "SET_ID";

export const setId = (payload) => ({ type: SET_ID, payload });

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
export const fetchAllOrderDetail = (page = 0, rows = 10) => {
  return async (dispatch, getState) => {
    console.log("fetchAllOrderDetail", getState());
    try {
      const response = await fetch(
        `${urlBase}/orders/details/state?page=${page}&size=${rows}`,
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
      dispatch(getAllOrderDetail(data));
    } catch (error) {
      console.log(error);
      dispatch(handleError(error.message));
    }
  };
};

// GET ALL ORDER DETAIL BY ORDER
export const GET_ALL_DETAIL_BY_ORDER = "GET_ALL_DETAIL_BY_ORDER";
export const getAllDetailByOrder = (payload) => ({
  type: GET_ALL_DETAIL_BY_ORDER,
  payload,
});

export const fetchAllDetailByOrder = (orderId) => {
  return async (dispatch, getState) => {
    console.log("fetchAllDetailByOrder", getState());
    try {
      const response = await fetch(
        `${urlBase}/orders/${orderId}/details?size=50`,
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
      dispatch(getAllDetailByOrder(data));
    } catch (error) {
      console.log(error);
      dispatch(handleError(error.message));
    }
  };
};

// POST ORDER DETAIL
export const fetchUpdateOrderDetail = (
  payload,
  orderDetailId,
  page = 0,
  orderId
) => {
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
      if (orderId) {
        dispatch(getOrder(orderId));
      }
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
      const response = await fetch(URL_ALL_ORDER + page, {
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
      const response = await fetch(URL_ALL_ORDER_STATE + page, {
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
      const response = await fetch(URL_ALL_ORDER, {
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
      localStorage.setItem("orderId", data.id);
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
      const response = await fetch(`${urlBase}/orders/${orderId}/state`, {
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
      const response = await fetch(URL_ALL_TABLE + page, {
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
      const response = await fetch(URL_ALL_TABLE_STATE + page, {
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
export const fetchSaveTable = (payload, page = 0) => {
  return async (dispatch, getState) => {
    console.log("fetchSaveTable", getState());
    try {
      const response = await fetch(`${urlBase}/tables`, {
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
      dispatch(fetchAllTable(page));
      dispatch(fetchAllTableState(page));
    } catch (error) {
      console.log(error);
      dispatch(handleError(error.message));
    }
  };
};

// PATCH TABLE
export const fetchPatchTable = (payload, tableId, page = 0) => {
  return async (dispatch, getState) => {
    console.log("fetchPatchTable", getState());
    try {
      const response = await fetch(`${urlBase}/tables/${tableId}/number`, {
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
      dispatch(fetchAllTable(page));
      dispatch(fetchAllTableState(page));
    } catch (error) {
      console.log(error);
      dispatch(handleError(error.message));
    }
  };
};

// PATCH TABLE STATE
export const fetchPatchTableState = (payload, tableId, page = 0) => {
  return async (dispatch, getState) => {
    console.log("fetchPatchTableState", getState());
    try {
      const response = await fetch(`${urlBase}/tables/${tableId}/state`, {
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
      dispatch(fetchAllTable(page));
      dispatch(fetchAllTableState(page));
    } catch (error) {
      console.log(error);
      dispatch(handleError(error.message));
    }
  };
};

// DELETE TABLE
export const fetchDeleteTable = (tableId) => {
  return async (dispatch, getState) => {
    console.log("fetchDeleteTable", getState());
    try {
      const response = await fetch(`${urlBase}/tables/${tableId}`, {
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

export const fetchAllProduct = (page = 0) => {
  return async (dispatch, getState) => {
    console.log("fetchAllProduct", getState());
    try {
      const response = await fetch(URL_ALL_PRODUCT + page, {
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

// ADD PRODUCT
export const fetchSaveProduct = (payload, page = 0) => {
  return async (dispatch, getState) => {
    console.log("fetchSaveProduct", getState());
    try {
      const response = await fetch(`${urlBase}/products`, {
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
      dispatch(fetchAllProduct(page));
    } catch (error) {
      console.log(error);
      dispatch(handleError(error.message));
    }
  };
};

// PUT PRODUCT
export const fetchPutProduct = (payload, productId, page) => {
  return async (dispatch, getState) => {
    console.log("fetchPutProduct", getState());
    try {
      const response = await fetch(`${urlBase}/products/${productId}`, {
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
      dispatch(fetchAllProduct(page));
    } catch (error) {
      console.log(error);
      dispatch(handleError(error.message));
    }
  };
};

// DELETE PRODUCT
export const fetchDeleteProduct = (productId, page = 0) => {
  return async (dispatch, getState) => {
    console.log("fetchDeleteProduct", getState());
    try {
      const response = await fetch(`${urlBase}/products/${productId}`, {
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
      dispatch(fetchAllProduct(page));
    } catch (error) {
      console.log(error);
      dispatch(handleError(error.message));
    }
  };
};

// LOGIN
export const fetchLogin = (payload) => {
  return async () => {
    try {
      const response = await fetch(`${urlBase}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const data = await response.json();
      localStorage.setItem("authToken", data.accessToken);
      localStorage.setItem("adminPassword", 1234);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const CURRENT_USER = "CURRENT_USER";
export const setCurrentUser = (payload) => ({ type: CURRENT_USER, payload });
export const URL_CURRENT_USER = `${urlBase}/users/profile`;

// CURRENT USER
export const fetchCurrentUser = () => {
  return async (dispatch, getState) => {
    console.log("fetchCurrentUser", getState());
    try {
      const response = await fetch(URL_CURRENT_USER, {
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
      dispatch(setCurrentUser(data));
    } catch (error) {
      console.log(error);
      dispatch(handleError(error.message));
      throw error;
    }
  };
};

// PUT CURRENT USER
export const fetchPutCurrentUser = (payload) => {
  return async (dispatch, getState) => {
    console.log("fetchPutCurrentUser", getState());
    try {
      const response = await fetch(URL_CURRENT_USER, {
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
      dispatch(setCurrentUser(data));
    } catch (error) {
      console.log(error);
      dispatch(handleError(error.message));
    }
  };
};

export const URL_ALL_USER = `${urlBase}/users?page=`;
export const ALL_USER = "ALL_USER";
export const setAllUser = (payload) => ({ type: ALL_USER, payload });

// GET ALL USERS
export const fetchAllUser = (page = 0) => {
  return async (dispatch, getState) => {
    console.log("fetchAllUser", getState());
    try {
      const response = await fetch(URL_ALL_USER + page, {
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
      dispatch(setAllUser(data));
    } catch (error) {
      console.log(error);
      dispatch(handleError(error.message));
    }
  };
};

// POST SAVE USER
export const fetchSaveUser = (payload, page = 0) => {
  return async (dispatch, getState) => {
    console.log("fetchSaveUser", getState());
    try {
      const response = await fetch(`${urlBase}/users`, {
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
      dispatch(fetchAllUser(page));
    } catch (error) {
      console.log(error);
      dispatch(handleError(error.message));
    }
  };
};

// PATCH USER ROLE
export const fetchPatchUserRole = (payload, userId, page = 0) => {
  return async (dispatch, getState) => {
    console.log("fetchPatchUserRole", getState());
    try {
      const response = await fetch(`${urlBase}/users/${userId}/role`, {
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
      dispatch(fetchAllUser(page));
    } catch (error) {
      console.log(error);
      dispatch(handleError(error.message));
    }
  };
};

// DELETE USER
export const fetchDeleteUser = (userId, page = 0) => {
  return async (dispatch, getState) => {
    console.log("fetchDeleteUser", getState());
    try {
      const response = await fetch(`${urlBase}/users/${userId}`, {
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
      dispatch(fetchAllUser(page));
    } catch (error) {
      console.log(error);
      dispatch(handleError(error.message));
    }
  };
};
