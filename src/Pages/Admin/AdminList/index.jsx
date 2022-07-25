import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "../../../common_components/LoadingSpinner";
import { getAdminList, reset } from "../../../features/admin/adminSlice";
import PageNotFound from "../../Error/PageNotFound";
import SingleAdminTableItem from "./components/SingleAdminTableItem";

const AdminList = () => {
  const dispatch = useDispatch();
  //get initial state from admin store
  const { adminList, isAdminLoading, isAdminError } = useSelector(
    (state) => state.admin
  );
  //get admin list when page load
  useEffect(() => {
    dispatch(getAdminList());
    return () => dispatch(reset());
  }, [dispatch]);

  //if there are error
  if (isAdminError) {
    return <PageNotFound />;
  }

  //if the page is loading
  if (isAdminLoading) {
    return <LoadingSpinner />;
  }
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
          {adminList &&
            adminList.map((i, index) => {
              return (
                <SingleAdminTableItem {...i} key={index} count={index + 1} />
              );
            })}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
};

export default AdminList;
