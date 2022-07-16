import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import Pagination from "../../../common_components/Pagination";
import SingleUserTableItem from "./components/SingleUserTableItem";
const UserList = () => {
  return (
    <div className="user-list">
      {/* top */}
      <div className="top d-flex justify-content-between">
        <h5>User list</h5>
      </div>
      {/* category list */}
      <MDBTable className="my-5">
        <MDBTableHead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Id</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Created At</th>
            <th scope="col">Status</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          <SingleUserTableItem />
        </MDBTableBody>
      </MDBTable>
      {/* pagination */}
      <Pagination />
    </div>
  );
};

export default UserList;
