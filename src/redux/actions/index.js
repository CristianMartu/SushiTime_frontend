export const GET_ORDER = "GET_ORDER";

const token = localStorage.getItem("authToken");

const URL_ORDER =
  "http://localhost:3001/orders/38e1a137-9c96-4d82-b850-c61636affb44";

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

const URL_ALL_CATEGORY = "http://localhost:3001/categories?size=50";

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

export const removeProduct = (payload) => ({
  type: REMOVE_PRODUCT,
  payload,
});

export const addProduct = (payload) => ({
  type: ADD_PRODUCT,
  payload,
});

// export const GET_ALL_PRODUCTS_BY_CATEGORY = "GET_ALL_PRODUCTS_BY_CATEGORY";
// export const getAllProducts = (paylaod) => ({
//   type: GET_ALL_PRODUCTS_BY_CATEGORY,
//   paylaod,
// });

// const URL_PRODUCTS = "http://localhost:3001/products/category?size=50";

// export const getProducts = (categoryName) => {
//   const payload = {
//     name: categoryName,
//   };
//   return async (dispatch, getState) => {
//     console.log("GET STATE", getState());
//     try {
//       let response = await fetch(URL_PRODUCTS, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       });
//       if (response.ok) {
//         let data = await response.json();
//         dispatch(getAllProducts(data));
//       } else {
//         throw new Error("Errore nella fetch ");
//       }
//     } catch (error) {
//       console.log("error", error);
//     }
//   };
// };
