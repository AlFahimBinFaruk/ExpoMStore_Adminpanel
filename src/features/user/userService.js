import axios from "axios";
//api route
const API_URL = `${process.env.REACT_APP_BASE_URL}/api/user`;

//getUserList
const getUserList = async (token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/user-list`, config);

  return response.data;
};

//manageUserStatus
const manageUserStatus = async (data, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(
    `${API_URL}/manage-user-status/:id`,
    data,
    config
  );

  return response.data;
};

//export all these functions
const userService = {
  getUserList,
  manageUserStatus,
};

export default userService;
