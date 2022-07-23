import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";

//initial state
const initialState = {
  productList: null,
  productDetails: null,
  isProductError: false,
  isProductSuccess: false,
  isProductLoading: false,
  productMessage: "",
};

/**
 * add new product
 * only admin or super admin can access this
 */
export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (data, thunkAPI) => {
    try {
      //get the admin token ..
      const token = thunkAPI.getState().admin.adminInfo.token;
      return await productService.addProduct(data, token);
    } catch (error) {
      const productMessage =
        (error.response &&
          error.response.data &&
          error.response.data.productMessage) ||
        error.productMessage ||
        error.toString();

      return thunkAPI.rejectWithValue(productMessage);
    }
  }
);

/**
 * get all product list
 * only admin or super admin can access this
 */
export const getAllProductList = createAsyncThunk(
  "product/getAllProductList",
  async (pageNo, thunkAPI) => {
    try {
      //get the admin token ..
      const token = thunkAPI.getState().admin.adminInfo.token;
      return await productService.getAllProductList(pageNo, token);
    } catch (error) {
      const productMessage =
        (error.response &&
          error.response.data &&
          error.response.data.productMessage) ||
        error.productMessage ||
        error.toString();

      return thunkAPI.rejectWithValue(productMessage);
    }
  }
);
/**
 * get product details
 */
export const getProductDetails = createAsyncThunk(
  "product/getProductDetails",
  async (id, thunkAPI) => {
    try {
      return await productService.getProductDetails(id);
    } catch (error) {
      const productMessage =
        (error.response &&
          error.response.data &&
          error.response.data.productMessage) ||
        error.productMessage ||
        error.toString();

      return thunkAPI.rejectWithValue(productMessage);
    }
  }
);

/**
 * delete product
 * only admin or super admin can access this
 */
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, thunkAPI) => {
    try {
      //get the admin token ..
      const token = thunkAPI.getState().admin.adminInfo.token;
      return await productService.deleteProduct(id, token);
    } catch (error) {
      const productMessage =
        (error.response &&
          error.response.data &&
          error.response.data.productMessage) ||
        error.productMessage ||
        error.toString();

      return thunkAPI.rejectWithValue(productMessage);
    }
  }
);

/**
 * edit product
 * only admin or super admin can access this
 */
export const editProduct = createAsyncThunk(
  "product/editProduct",
  async ({ id, data }, thunkAPI) => {
    try {
      //get the admin token ..
      const token = thunkAPI.getState().admin.adminInfo.token;
      return await productService.editProduct(id, data, token);
    } catch (error) {
      const productMessage =
        (error.response &&
          error.response.data &&
          error.response.data.productMessage) ||
        error.productMessage ||
        error.toString();

      return thunkAPI.rejectWithValue(productMessage);
    }
  }
);
/**
 * manage product status
 * only admin or super admin can access this
 */
export const manageProductStatus = createAsyncThunk(
  "product/manageProductStatus",
  async ({ id, data }, thunkAPI) => {
    try {
      //get the admin token ..
      const token = thunkAPI.getState().admin.adminInfo.token;
      return await productService.manageProductStatus(id, data, token);
    } catch (error) {
      const productMessage =
        (error.response &&
          error.response.data &&
          error.response.data.productMessage) ||
        error.productMessage ||
        error.toString();

      return thunkAPI.rejectWithValue(productMessage);
    }
  }
);

//product slice
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    reset: (state) => {
      state.isProductLoading = false;
      state.isProductSuccess = false;
      state.isProductError = false;
      state.productMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.isProductLoading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isProductLoading = false;
        state.isProductSuccess = true;
        state.productList.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isProductLoading = false;
        state.isProductError = true;
        state.productMessage = action.payload;
      })
      .addCase(getAllProductList.pending, (state) => {
        state.isProductLoading = true;
      })
      .addCase(getAllProductList.fulfilled, (state, action) => {
        state.isProductLoading = false;
        state.isProductSuccess = true;
        state.productList = action.payload;
      })
      .addCase(getAllProductList.rejected, (state, action) => {
        state.isProductLoading = false;
        state.isProductError = true;
        state.productMessage = action.payload;
      })
      .addCase(getProductDetails.pending, (state) => {
        state.isProductLoading = true;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.isProductLoading = false;
        state.isProductSuccess = true;
        state.productDetails = action.payload;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.isProductLoading = false;
        state.isProductError = true;
        state.productMessage = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isProductLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isProductLoading = false;
        state.isProductSuccess = true;
        state.productList = state.productList.filter(
          (product) => product._id !== action.payload.id
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isProductLoading = false;
        state.isProductError = true;
        state.productMessage = action.payload;
      })
      .addCase(editProduct.pending, (state) => {
        state.isProductLoading = true;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.isProductLoading = false;
        state.isProductSuccess = true;
        state.productList = state.productList.filter((product) => {
          if (product._id === action.payload._id) {
            return action.payload;
          }
        });
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.isProductLoading = false;
        state.isProductError = true;
        state.productMessage = action.payload;
      })
      .addCase(manageProductStatus.pending, (state) => {
        state.isProductLoading = true;
      })
      .addCase(manageProductStatus.fulfilled, (state, action) => {
        state.isProductLoading = false;
        state.isProductSuccess = true;
        state.productList = state.productList.filter((product) => {
          if (product._id === action.payload._id) {
            return action.payload;
          }
        });
      })
      .addCase(manageProductStatus.rejected, (state, action) => {
        state.isProductLoading = false;
        state.isProductError = true;
        state.productMessage = action.payload;
      });
  },
});

//export slice reset function
export const { reset } = productSlice.actions;

//export the  slice
export default productSlice.reducer;
