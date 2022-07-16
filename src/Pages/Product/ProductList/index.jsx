import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import Pagination from "../../../common_components/Pagination";
import SingleProductTableItem from "./components/SingleProductTableItem";
const ProductList = () => {
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
            <th scope="col">Category</th>
            <th scope="col">Thumbnail</th>
            <th scope="col">Status</th>
            <th scope="col">Edit</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          <SingleProductTableItem />
        </MDBTableBody>
      </MDBTable>
      {/* pagination */}
      <Pagination />
    </div>
  );
};

export default ProductList;
