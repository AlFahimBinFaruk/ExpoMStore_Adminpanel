import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import Pagination from "../../../common_components/Pagination";
import SingleAdminTableItem from "./components/SingleAdminTableItem";
const AdminList = () => {
  return (
    <div className="admin-list">
      {/* top */}
      <div className="top d-flex justify-content-between">
        <h5>Admin list</h5>
      </div>
      {/* category list */}
      <MDBTable className="my-5">
        <MDBTableHead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Id</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Created At</th>
            <th scope="col">Status</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          <SingleAdminTableItem />
        </MDBTableBody>
      </MDBTable>
      {/* pagination */}
      <Pagination />
    </div>
  );
};

export default AdminList;
