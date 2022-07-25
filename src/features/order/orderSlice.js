import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./orderService";

//initial state
const initialState = {
  orderList: null,
  orderDetails: null,
  isOrderError: false,
  isOrderSuccess: false,
  isOrderLoading: false,
  orderMessage: "",
};

/**
 * get all order list
 * only admin , super admin,delivery man can access this
 */
export const getAllOrderList = createAsyncThunk(
  "order/getAllOrderList",
  async (pageNo, thunkAPI) => {
    try {
      //get the admin token ..
      const token = thunkAPI.getState().admin.adminInfo.token;
      return await orderService.getAllOrderList(pageNo, token);
    } catch (error) {
      const orderMessage =
        (error.response &&
          error.response.data &&
          error.response.data.orderMessage) ||
        error.orderMessage ||
        error.toString();

      return thunkAPI.rejectWithValue(orderMessage);
    }
  }
);
/**
 * get order details
 * only admin , super admin,delivery man can access this
 */
export const getOrderDetails = createAsyncThunk(
  "order/getOrderDetails",
  async (id, thunkAPI) => {
    try {
      //get the admin token ..
      const token = thunkAPI.getState().admin.adminInfo.token;
      return await orderService.getOrderDetails(id, token);
    } catch (error) {
      const orderMessage =
        (error.response &&
          error.response.data &&
          error.response.data.orderMessage) ||
        error.orderMessage ||
        error.toString();

      return thunkAPI.rejectWithValue(orderMessage);
    }
  }
);

/**
 * manage order status
 * only admin , super admin,delivery man can access this
 */
export const manageOrderStatus = createAsyncThunk(
  "order/manageOrderStatus",
  async ({ id, data }, thunkAPI) => {
    try {
      //get the admin token ..
      const token = thunkAPI.getState().admin.adminInfo.token;
      return await orderService.manageOrderStatus(id, data, token);
    } catch (error) {
      const orderMessage =
        (error.response &&
          error.response.data &&
          error.response.data.orderMessage) ||
        error.orderMessage ||
        error.toString();

      return thunkAPI.rejectWithValue(orderMessage);
    }
  }
);

//order slice
export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    reset: (state) => {
      state.isOrderLoading = false;
      state.isOrderSuccess = false;
      state.isOrderError = false;
      state.orderMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrderList.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(getAllOrderList.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.isOrderSuccess = true;
        state.orderList = action.payload;
      })
      .addCase(getAllOrderList.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.isOrderError = true;
        state.orderMessage = action.payload;
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.isOrderSuccess = true;
        state.orderDetails = action.payload;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.isOrderError = true;
        state.orderMessage = action.payload;
      })
      .addCase(manageOrderStatus.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(manageOrderStatus.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.isOrderSuccess = true;
        state.orderDetails = action.payload;
        state.orderList.orderList = state.orderList.orderList.map(
          (order) => {
            if (order._id === action.payload._id) {
              return action.payload;
            }
            return order;
          }
        );
      })
      .addCase(manageOrderStatus.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.isOrderError = true;
        state.orderMessage = action.payload;
      });
  },
});

//export slice reset function
export const { reset } = orderSlice.actions;

//export the  slice
export default orderSlice.reducer;
