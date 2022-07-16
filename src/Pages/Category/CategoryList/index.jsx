import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import Pagination from "../../../common_components/Pagination"
import SingleCategoryTableItem from "./components/SingleCategoryTableItem";
const CategoryList = () => {
  return (
    <div className="category">
      {/* top */}
      <div className="top d-flex justify-content-between">
        <h5>Category list</h5>
        <MDBBtn color="success">Add New</MDBBtn>
      </div>
      {/* category list */}
      <MDBTable className="my-5">
        <MDBTableHead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Id</th>
            <th scope="col">Title</th>
            <th scope="col">Status</th>
            <th scope="col">Edit</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          <SingleCategoryTableItem />
        </MDBTableBody>
      </MDBTable>
      {/* pagination */}
      <Pagination />
    </div>
  );
};

export default CategoryList;
