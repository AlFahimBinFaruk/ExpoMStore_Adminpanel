import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dashboardService from "./dashboardService";

//initial state
const initialState = {
  dashboardDetails: null,
  isDashboardError: false,
  isDashboardSuccess: false,
  isDashboardLoading: false,
  dashboardMessage: "",
};

/**
 * get dashboard overview
 * only admin or super admin can access this
 */
export const getDashboardOverview = createAsyncThunk(
  "dashboard/getDashboardOverview",
  async (_, thunkAPI) => {
    try {
      //get the admin token ..
      const token = thunkAPI.getState().admin.adminInfo.token;
      return await dashboardService.addCategory(token);
    } catch (error) {
      const dashboardMessage =
        (error.response &&
          error.response.data &&
          error.response.data.dashboardMessage) ||
        error.dashboardMessage ||
        error.toString();

      return thunkAPI.rejectWithValue(dashboardMessage);
    }
  }
);

//dashboard
export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    reset: (state) => {
      state.isDashboardLoading = false;
      state.isDashboardSuccess = false;
      state.isDashboardError = false;
      state.dashboardMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardOverview.pending, (state) => {
        state.isDashboardLoading = true;
      })
      .addCase(getDashboardOverview.fulfilled, (state, action) => {
        state.isDashboardLoading = false;
        state.isDashboardSuccess = true;
        state.dashboardDetails = action.payload;
      })
      .addCase(getDashboardOverview.rejected, (state, action) => {
        state.isDashboardLoading = false;
        state.isDashboardError = true;
        state.dashboardMessage = action.payload;
      });
  },
});

//export slice reset function
export const { reset } = dashboardSlice.actions;

//export the  slice
export default dashboardSlice.reducer;
