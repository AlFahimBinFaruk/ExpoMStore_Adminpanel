import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../features/admin/adminSlice";
import categoryReducer from "../features/category/categorySlice";
import orderReducer from "../features/order/orderSlice";
import productReducer from "../features/product/productSlice";
import userReducer from "../features/user/userSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    category: categoryReducer,
    order: orderReducer,
    product: productReducer,
    user: userReducer,
    dashboard: dashboardReducer,
  },
});
