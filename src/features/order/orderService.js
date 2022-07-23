import axios from "axios";
//api route
const API_URL = `${process.env.REACT_APP_BASE_URL}/api/order`;

//getAllOrderList
const getAllOrderList = async (pageNo, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    `${API_URL}/order-history?pageNo=${pageNo}`,
    config
  );

  return response.data;
};

//getOrderDetails
const getOrderDetails = async (id, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/order-details/${id}`, config);
  return response.data;
};

//manageOrderStatus
const manageOrderStatus = async (id, data, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(
    `${API_URL}/manage-order-status/${id}`,
    data,
    config
  );

  return response.data;
};

//export all these functions
const orderService = {
  getAllOrderList,
  getOrderDetails,
  manageOrderStatus,
};

export default orderService;
