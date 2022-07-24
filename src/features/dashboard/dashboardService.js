import axios from "axios";
//api route
const API_URL = `${process.env.REACT_APP_BASE_URL}/api/dashboard`;

//getDashboardOverview
const getDashboardOverview = async (token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/overview`, config);

  return response.data;
};

//export all these functions
const dashboardService = {
  getDashboardOverview,
};

export default dashboardService;
