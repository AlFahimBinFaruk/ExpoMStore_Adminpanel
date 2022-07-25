import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminService from "./adminService";

//get admin info from localstorage if it exits.
const adminInfo = JSON.parse(localStorage.getItem("esAdmin"));

//initial state
const initialState = {
  adminInfo: adminInfo ? adminInfo : null,
  adminList: null,
  isAdminError: false,
  isAdminSuccess: false,
  isAdminLoading: false,
  adminMessage: "",
};

//register admin
export const register = createAsyncThunk(
  "admin/register",
  async (data, thunkAPI) => {
    try {
      //pass user to register function from authservice..
      return await adminService.register(data);
    } catch (error) {
      const adminMessage =
        (error.response &&
          error.response.data &&
          error.response.data.adminMessage) ||
        error.adminMessage ||
        error.toString();

      return thunkAPI.rejectWithValue(adminMessage);
    }
  }
);

//login admin
export const login = createAsyncThunk("admin/login", async (data, thunkAPI) => {
  try {
    //pass user to login function from
    return await adminService.login(data);
  } catch (error) {
    const adminMessage =
      (error.response &&
        error.response.data &&
        error.response.data.adminMessage) ||
      error.adminMessage ||
      error.toString();

    return thunkAPI.rejectWithValue(adminMessage);
  }
});

//change admin password
export const changePassword = createAsyncThunk(
  "admin/changePassword",
  async (data, thunkAPI) => {
    try {
      //get the admin token ..
      const token = thunkAPI.getState().admin.adminInfo.token;
      return await adminService.changePassword(data, token);
    } catch (error) {
      const adminMessage =
        (error.response &&
          error.response.data &&
          error.response.data.adminMessage) ||
        error.adminMessage ||
        error.toString();

      return thunkAPI.rejectWithValue(adminMessage);
    }
  }
);

//logout admin
export const logout = createAsyncThunk("admin/logout", async () => {
  //call logout function
  adminService.logout();
});

/**
 * get admin list
 * only admin or super admin can access this
 */
export const getAdminList = createAsyncThunk(
  "admin/getAdminList",
  async (_, thunkAPI) => {
    try {
      //get the admin token ..
      const token = thunkAPI.getState().admin.adminInfo.token;
      return await adminService.getAdminList(token);
    } catch (error) {
      const adminMessage =
        (error.response &&
          error.response.data &&
          error.response.data.adminMessage) ||
        error.adminMessage ||
        error.toString();

      return thunkAPI.rejectWithValue(adminMessage);
    }
  }
);
/**
 * manage admin status
 * only admin or super admin can access this
 */
export const manageAdminStatus = createAsyncThunk(
  "admin/manageAdminStatus",
  async ({ id, data }, thunkAPI) => {
    try {
      //get the admin token ..
      const token = thunkAPI.getState().admin.adminInfo.token;
      return await adminService.manageAdminStatus(id, data, token);
    } catch (error) {
      const adminMessage =
        (error.response &&
          error.response.data &&
          error.response.data.adminMessage) ||
        error.adminMessage ||
        error.toString();

      return thunkAPI.rejectWithValue(adminMessage);
    }
  }
);

//admin slice
export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    reset: (state) => {
      state.isAdminLoading = false;
      state.isAdminSuccess = false;
      state.isAdminError = false;
      state.adminMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isAdminLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isAdminLoading = false;
        state.isAdminSuccess = true;
        state.adminMessage = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isAdminLoading = false;
        state.isAdminError = true;
        state.adminMessage = action.payload;
        state.adminInfo = null;
      })
      .addCase(login.pending, (state) => {
        state.isAdminLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAdminLoading = false;
        state.isAdminSuccess = true;
        state.adminInfo = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isAdminLoading = false;
        state.isAdminError = true;
        state.adminMessage = action.payload;
        state.adminInfo = null;
      })
      .addCase(changePassword.pending, (state) => {
        state.isAdminLoading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isAdminLoading = false;
        state.isAdminSuccess = true;
        state.adminMessage = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isAdminLoading = false;
        state.isAdminError = true;
        state.adminMessage = action.payload;
      })
      .addCase(getAdminList.pending, (state) => {
        state.isAdminLoading = true;
      })
      .addCase(getAdminList.fulfilled, (state, action) => {
        state.isAdminLoading = false;
        state.isAdminSuccess = true;
        state.adminList = action.payload;
      })
      .addCase(getAdminList.rejected, (state, action) => {
        state.isAdminLoading = false;
        state.isAdminError = true;
        state.adminMessage = action.payload;
      })
      .addCase(manageAdminStatus.pending, (state) => {
        state.isAdminLoading = true;
      })
      .addCase(manageAdminStatus.fulfilled, (state, action) => {
        state.isAdminLoading = false;
        state.isAdminSuccess = true;
        state.adminList = state.adminList.map((admin) => {
          if (admin._id === action.payload._id) {
            return action.payload;
          }
          return admin;
        });
      })
      .addCase(manageAdminStatus.rejected, (state, action) => {
        state.isAdminLoading = false;
        state.isAdminError = true;
        state.adminMessage = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.adminInfo = null;
        state.isAdminSuccess = true;
      });
  },
});

//export slice reset function
export const { reset } = adminSlice.actions;

//export the  slice
export default adminSlice.reducer;
