import "./App.css";
import Header from "./common_components/Header";
import Sidebar from "./common_components/Sidebar";

import { MDBContainer } from "mdb-react-ui-kit";
import CategoryList from "./Pages/Category/CategoryList";
import AddCategory from "./Pages/Category/AddCategory";
import EditCategory from "./Pages/Category/EditCategory";
import ProductList from "./Pages/Product/ProductList";
import AddProduct from "./Pages/Product/AddProduct";
import EditProduct from "./Pages/Product/EditProduct";

function App() {
  return (
    <div className="d-flex" id="wrapper">
      <Sidebar />
      <div id="page-content-wrapper">
        <Header />
        {/* pages */}
        <MDBContainer className="my-5">
          {/* <CategoryList /> */}
          {/* <AddCategory/> */}
          {/* <EditCategory/> */}
          {/* <ProductList /> */}
          {/* <AddProduct/> */}
          <EditProduct/>
        </MDBContainer>
      </div>
    </div>
  );
}

export default App;
