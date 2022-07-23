import axios from "axios";
//api route
const API_URL = `${process.env.REACT_APP_BASE_URL}/api/category`;

//add new category
const addCategory = async (data, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${API_URL}/add`, data, config);

  return response.data;
};

//getAllCategoryList
const getAllCategoryList = async (pageNo, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    `${API_URL}/all-category-list?pageNo=${pageNo}`,
    config
  );

  return response.data;
};

//editCategory
const editCategory = async (id, data, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(`${API_URL}/edit/${id}`, data, config);

  return response.data;
};

//manageCategoryStatus
const manageCategoryStatus = async (id, data, token) => {
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

//delete category
const deleteCategory = async (id, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/${id}`, config);

  return response.data;
};

//export all these functions
const categoryService = {
  addCategory,
  getAllCategoryList,
  deleteCategory,
  editCategory,
  manageCategoryStatus,
};

export default categoryService;
