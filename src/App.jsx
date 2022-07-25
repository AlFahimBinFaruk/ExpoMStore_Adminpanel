import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MDBContainer } from "mdb-react-ui-kit";
import Header from "./common_components/Header";
import Sidebar from "./common_components/Sidebar";
import CategoryList from "./Pages/Category/CategoryList";
import AddCategory from "./Pages/Category/AddCategory";
import EditCategory from "./Pages/Category/EditCategory";
import ProductList from "./Pages/Product/ProductList";
import AddProduct from "./Pages/Product/AddProduct";
import EditProduct from "./Pages/Product/EditProduct";
import UserList from "./Pages/User/UserList";
import AdminList from "./Pages/Admin/AdminList";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Authentication/Login";
import Register from "./Pages/Authentication/Register";
import Account from "./Pages/Authentication/Account";
import OrderList from "./Pages/Order/OrderList";
import OrderDetails from "./Pages/Order/OrderDetails";
import PageNotFound from "./Pages/Error/PageNotFound";
import ServerErrorPage from "./Pages/Error/ServerErrorPage";
import Alert from "./common_components/Alert";
import { useSelector } from "react-redux";

function App() {
  //get initial state from admin store
  const { adminInfo } = useSelector((state) => state.admin);

  return (
    <div className="d-flex" id="wrapper">
      <BrowserRouter>
        {/* alert */}
        <Alert />
        {adminInfo?.role ? (
          <>
            <Sidebar />
            <div id="page-content-wrapper">
              <Header />
              {/* pages */}
              <MDBContainer className="my-5">
                {/* routes */}
                <Routes>
                  {(adminInfo?.role === "admin" ||
                    adminInfo?.role === "super admin") && (
                    <>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/category-list" element={<CategoryList />} />
                      <Route path="/category/add" element={<AddCategory />} />
                      <Route
                        path="/category/edit/:id"
                        element={<EditCategory />}
                      />
                      <Route path="/product-list" element={<ProductList />} />
                      <Route path="/product/add" element={<AddProduct />} />
                      <Route
                        path="/product/edit/:id"
                        element={<EditProduct />}
                      />
                      <Route path="/user-list" element={<UserList />} />
                      <Route path="/admin-list" element={<AdminList />} />
                    </>
                  )}

                  <Route path="/order-list" element={<OrderList />} />
                  <Route path="/order/details/:id" element={<OrderDetails />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/server-error" element={<ServerErrorPage />} />
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </MDBContainer>
            </div>
          </>
        ) : (
          <MDBContainer>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/server-error" element={<ServerErrorPage />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </MDBContainer>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
