import axios from "axios";
//api route
const API_URL = `${process.env.REACT_APP_BASE_URL}/api/admin`;

//register
const register = async (data) => {
  const response = await axios.post(`${API_URL}`, data);
  //if we get data in response we will save it to localstorage
  if (response.data) {
    localStorage.setItem("esAdmin", JSON.stringify(response.data));
  }
  return response.data;
};

//login
const login = async (data) => {
  const response = await axios.post(`${API_URL}/login`, data);
  //if we get data in response we will save it to localstorage
  if (response.data) {
    localStorage.setItem("esAdmin", JSON.stringify(response.data));
  }
  return response.data;
};

//changePassword
const changePassword = async (data, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(
    `${API_URL}/change-password`,
    data,
    config
  );
  if (response.data) {
    localStorage.removeItem("esAdmin");
  }
  return response.data;
};

//logout user
const logout = () => {
  localStorage.removeItem("user");
};

//getAdminList
const getAdminList = async (token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/admin-list`, config);

  return response.data;
};

//manageAdminStatus
const manageAdminStatus = async (id, data, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(
    `${API_URL}/manage-status/${id}`,
    data,
    config
  );

  return response.data;
};

//export all these functions
const adminService = {
  register,
  login,
  logout,
  changePassword,
  getAdminList,
  manageAdminStatus,
};

export default adminService;
