import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

//initial state
const initialState = {
  userList: null,
  isUserError: false,
  isUserSuccess: false,
  isUserLoading: false,
  userMessage: "",
};

/**
 * get user list
 * only admin or super admin can access this
 */
export const getUserList = createAsyncThunk(
  "user/getUserList",
  async (_, thunkAPI) => {
    try {
      //get the admin token ..
      const token = thunkAPI.getState().admin.adminInfo.token;
      return await userService.getUserList(token);
    } catch (error) {
      const userMessage =
        (error.response &&
          error.response.data &&
          error.response.data.userMessage) ||
        error.userMessage ||
        error.toString();

      return thunkAPI.rejectWithValue(userMessage);
    }
  }
);
/**
 * manage user status
 * only admin or super admin can access this
 */
export const manageUserStatus = createAsyncThunk(
  "user/manageUserStatus",
  async ({id,data}, thunkAPI) => {
    try {
      //get the admin token ..
      const token = thunkAPI.getState().admin.adminInfo.token;
      return await userService.manageUserStatus(id,data, token);
    } catch (error) {
      const userMessage =
        (error.response &&
          error.response.data &&
          error.response.data.userMessage) ||
        error.userMessage ||
        error.toString();

      return thunkAPI.rejectWithValue(userMessage);
    }
  }
);

//user slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.isUserLoading = false;
      state.isUserSuccess = false;
      state.isUserError = false;
      state.userMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserList.pending, (state) => {
        state.isUserLoading = true;
      })
      .addCase(getUserList.fulfilled, (state, action) => {
        state.isUserLoading = false;
        state.isUserSuccess = true;
        state.userList = action.payload;
      })
      .addCase(getUserList.rejected, (state, action) => {
        state.isUserLoading = false;
        state.isUserError = true;
        state.userMessage = action.payload;
      })
      .addCase(manageUserStatus.pending, (state) => {
        state.isUserLoading = true;
      })
      .addCase(manageUserStatus.fulfilled, (state, action) => {
        state.isUserLoading = false;
        state.isUserSuccess = true;
        state.userList = state.userList.filter((user) => {
          if (user._id === action.payload._id) {
            return action.payload;
          }
        });
      })
      .addCase(manageUserStatus.rejected, (state, action) => {
        state.isUserLoading = false;
        state.isUserError = true;
        state.userMessage = action.payload;
      });
  },
});

//export slice reset function
export const { reset } = userSlice.actions;

//export the  slice
export default userSlice.reducer;
