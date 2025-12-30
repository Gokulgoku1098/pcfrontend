import baseurl from "./comman";
import axios from "axios";
import API from "./api";

export const registerUser = (data) =>
  API.post("/users/register", data);

export const loginUser = (data) =>
  API.post("/users/login", data);

// get all products 
export const getallProduct = () => axios.get(`${baseurl}/products/`)
export const getproductById=(id)=>axios.get(`${baseurl}/products/${id}`)
export const updproduct=(id,data)=>axios.put(`${baseurl}/products/${id}`,data)
export const delproduct=(id)=>axios.delete(`${baseurl}/products/${id}`)

// order place
export const addorder = (data) => {
  return API.post("/orders", data);
};
export const getMyOrders = (token) =>
  axios.get(`${baseurl}/orders/my`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  export const getProducts = (token) =>
  axios.get(`${baseurl}/products`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Orders
export const getOrders = (token) =>
  axios.get(`${baseurl}/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Users
export const getUsers = (token) =>
  axios.get(`${baseurl}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });



// Products
// export const getProducts = (token) =>
//   axios.get(`${baseurl}/products`, { headers: { Authorization: `Bearer ${token}` } });

export const addProduct = (data, token) =>
  axios.post(`${baseurl}/products`, data, { headers: { Authorization: `Bearer ${token}` } });

export const updateProduct = (id, data, token) =>
  axios.put(`${baseurl}/products/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });

export const deleteProduct = (id, token) =>
  axios.delete(`${baseurl}/products/${id}`, { headers: { Authorization: `Bearer ${token}` } });

// Orders
// export const getOrders = (token) =>
//   axios.get(`${baseurl}/orders`, { headers: { Authorization: `Bearer ${token}` } });

export const updateOrderStatus = (id, status, token) =>
  axios.put(`${baseurl}/orders/${id}`, { status }, { headers: { Authorization: `Bearer ${token}` } });

export const deleteOrder = (id, token) =>
  axios.delete(`${baseurl}/orders/${id}`, { headers: { Authorization: `Bearer ${token}` } });

// Users
// export const getUsers = (token) =>
//   axios.get(`${baseurl}/users`, { headers: { Authorization: `Bearer ${token}` } });

export const deleteUser = (id, token) =>
  axios.delete(`${baseurl}/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
