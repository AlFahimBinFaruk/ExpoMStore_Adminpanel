import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryService from "./categoryService";

//initial state
const initialState = {
  categoryList: null,
  categoryDetails: null,
  isCategoryError: false,
  isCategorySuccess: false,
  isCategoryLoading: false,
  categoryMessage: "",
};

/**
 * add new category
 * only admin or super admin can access this
 */
export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (data, thunkAPI) => {
    try {
      //get the admin token ..
      const token = thunkAPI.getState().admin.adminInfo.token;
      return await categoryService.addCategory(data, token);
    } catch (error) {
      const categoryMessage =
        (error.response &&
          error.response.data &&
          error.response.data.categoryMessage) ||
        error.categoryMessage ||
        error.toString();

      return thunkAPI.rejectWithValue(categoryMessage);
    }
  }
);

/**
 * get all category list
 * only admin or super admin can access this
 */
export const getAllCategoryList = createAsyncThunk(
  "category/getAllCategoryList",
  async (pageNo, thunkAPI) => {
    try {
      //get the admin token ..
      const token = thunkAPI.getState().admin.adminInfo.token;
      return await categoryService.getAllCategoryList(pageNo, token);
    } catch (error) {
      const categoryMessage =
        (error.response &&
          error.response.data &&
          error.response.data.categoryMessage) ||
        error.categoryMessage ||
        error.toString();

      return thunkAPI.rejectWithValue(categoryMessage);
    }
  }
);

/**
 * get category details
 * only admin or super admin can access this
 */
export const getCategoryDetails = createAsyncThunk(
  "category/getCategoryDetails",
  async (id, thunkAPI) => {
    try {
      //get the admin token ..
      const token = thunkAPI.getState().admin.adminInfo.token;
      return await categoryService.getCategoryDetails(id, token);
    } catch (error) {
      const categoryMessage =
        (error.response &&
          error.response.data &&
          error.response.data.categoryMessage) ||
        error.categoryMessage ||
        error.toString();

      return thunkAPI.rejectWithValue(categoryMessage);
    }
  }
);

/**
 * delete category
 * only admin or super admin can access this
 */
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id, thunkAPI) => {
    try {
      //get the admin token ..
      const token = thunkAPI.getState().admin.adminInfo.token;
      return await categoryService.deleteCategory(id, token);
    } catch (error) {
      const categoryMessage =
        (error.response &&
          error.response.data &&
          error.response.data.categoryMessage) ||
        error.categoryMessage ||
        error.toString();

      return thunkAPI.rejectWithValue(categoryMessage);
    }
  }
);

/**
 * edit category
 * only admin or super admin can access this
 */
export const editCategory = createAsyncThunk(
  "category/editCategory",
  async ({ id, data }, thunkAPI) => {
    try {
      //get the admin token ..
      const token = thunkAPI.getState().admin.adminInfo.token;
      return await categoryService.editCategory(id, data, token);
    } catch (error) {
      const categoryMessage =
        (error.response &&
          error.response.data &&
          error.response.data.categoryMessage) ||
        error.categoryMessage ||
        error.toString();

      return thunkAPI.rejectWithValue(categoryMessage);
    }
  }
);
/**
 * manage category status
 * only admin or super admin can access this
 */
export const manageCategoryStatus = createAsyncThunk(
  "category/manageCategoryStatus",
  async ({ id, data }, thunkAPI) => {
    try {
      //get the admin token ..
      const token = thunkAPI.getState().admin.adminInfo.token;
      return await categoryService.manageCategoryStatus(id, data, token);
    } catch (error) {
      const categoryMessage =
        (error.response &&
          error.response.data &&
          error.response.data.categoryMessage) ||
        error.categoryMessage ||
        error.toString();

      return thunkAPI.rejectWithValue(categoryMessage);
    }
  }
);

//category
export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    reset: (state) => {
      state.isCategoryLoading = false;
      state.isCategorySuccess = false;
      state.isCategoryError = false;
      state.categoryMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCategory.pending, (state) => {
        state.isCategoryLoading = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.isCategoryLoading = false;
        state.isCategorySuccess = true;
        state.categoryList.categoryList.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.isCategoryLoading = false;
        state.isCategoryError = true;
        state.categoryMessage = action.payload;
      })
      .addCase(getAllCategoryList.pending, (state) => {
        state.isCategoryLoading = true;
      })
      .addCase(getAllCategoryList.fulfilled, (state, action) => {
        state.isCategoryLoading = false;
        state.isCategorySuccess = true;
        state.categoryList = action.payload;
      })
      .addCase(getAllCategoryList.rejected, (state, action) => {
        state.isCategoryLoading = false;
        state.isCategoryError = true;
        state.categoryMessage = action.payload;
      })
      .addCase(getCategoryDetails.pending, (state) => {
        state.isCategoryLoading = true;
      })
      .addCase(getCategoryDetails.fulfilled, (state, action) => {
        state.isCategoryLoading = false;
        state.isCategorySuccess = true;
        state.categoryDetails = action.payload;
      })
      .addCase(getCategoryDetails.rejected, (state, action) => {
        state.isCategoryLoading = false;
        state.isCategoryError = true;
        state.categoryMessage = action.payload;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isCategoryLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isCategoryLoading = false;
        state.isCategorySuccess = true;
        state.categoryList = state.categoryList.categoryList.filter(
          (category) => category._id !== action.payload.id
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isCategoryLoading = false;
        state.isCategoryError = true;
        state.categoryMessage = action.payload;
      })
      .addCase(editCategory.pending, (state) => {
        state.isCategoryLoading = true;
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.isCategoryLoading = false;
        state.isCategorySuccess = true;
        state.categoryList.categoryList = state.categoryList.categoryList.map(
          (category) => {
            if (category._id === action.payload._id) {
              return action.payload;
            }
            return category;
          }
        );
      })
      .addCase(editCategory.rejected, (state, action) => {
        state.isCategoryLoading = false;
        state.isCategoryError = true;
        state.categoryMessage = action.payload;
      })
      .addCase(manageCategoryStatus.pending, (state) => {
        state.isCategoryLoading = true;
      })
      .addCase(manageCategoryStatus.fulfilled, (state, action) => {
        state.isCategoryLoading = false;
        state.isCategorySuccess = true;
        state.categoryList.categoryList = state.categoryList.categoryList.map(
          (category) => {
            if (category._id === action.payload._id) {
              return action.payload;
            }
            return category;
          }
        );
      })
      .addCase(manageCategoryStatus.rejected, (state, action) => {
        state.isCategoryLoading = false;
        state.isCategoryError = true;
        state.categoryMessage = action.payload;
      });
  },
});

//export slice reset function
export const { reset } = categorySlice.actions;

//export the  slice
export default categorySlice.reducer;
