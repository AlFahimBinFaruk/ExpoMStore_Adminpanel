import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "../../../common_components/LoadingSpinner";
import {
  getAllProductList,
  reset,
} from "../../../features/product/productSlice";
import Pagination from "../../../common_components/Pagination";
import ServerErrorPage from "../../Error/ServerErrorPage";
import SingleProductTableItem from "./components/SingleProductTableItem";

const ProductList = () => {
  const dispatch = useDispatch();
  const [pageNo, setPageNo] = useState(1);
  //get initial state from product store
  const { productList, isProductLoading, isProductError } = useSelector(
    (state) => state.product
  );
  //by default one time ,and then everytime pageNo changes call it..
  useEffect(() => {
    dispatch(getAllProductList(pageNo));

    return () => {
      reset();
    };
  }, [dispatch, pageNo]);

  //if there are error
  if (isProductError) {
    return <ServerErrorPage />;
  }

  //if the page is loading
  if (isProductLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="product-list">
      {/* top */}
      <div className="top d-flex justify-content-between">
        <h5>Product list</h5>
        <MDBBtn color="success">Add New</MDBBtn>
      </div>
      {/* category list */}
      <MDBTable className="my-5">
        <MDBTableHead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Id</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Category</th>
            <th scope="col">Thumbnail</th>
            <th scope="col">Status</th>
            <th scope="col">Edit</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {productList &&
            productList.productList.map((i, index) => {
              return (
                <SingleProductTableItem count={index + 1} {...i} key={index} />
              );
            })}
        </MDBTableBody>
      </MDBTable>
      {/* pagination */}
      <Pagination
        pageNo={pageNo}
        setPageNo={setPageNo}
        totalPageCount={productList?.totalPageCount}
      />
    </div>
  );
};

export default ProductList;
