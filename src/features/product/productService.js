import axios from "axios";
//api route
const API_URL = `${process.env.REACT_APP_BASE_URL}/api/product`;

//addProduct
const addProduct = async (data, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${API_URL}/add`, data, config);

  return response.data;
};

//getAllProductList
const getAllProductList = async (pageNo, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    `${API_URL}/get-all-product-list?pageNo=${pageNo}`,
    config
  );

  return response.data;
};
//getProductDetails
const getProductDetails = async (id) => {
  const response = await axios.get(`${API_URL}/details/${id}`);
  return response.data;
};

//editProduct
const editProduct = async (id, data, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(`${API_URL}/edit/${id}`, data, config);

  return response.data;
};

//manageProductStatus
const manageProductStatus = async (id, data, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(
    `${API_URL}/update-status/${id}`,
    data,
    config
  );

  return response.data;
};

//deleteProduct
const deleteProduct = async (id, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/${id}`, config);

  return response.data;
};

//export all these functions
const productService = {
  addProduct,
  getAllProductList,
  getProductDetails,
  deleteProduct,
  editProduct,
  manageProductStatus,
};

export default productService;
