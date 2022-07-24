import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "../../../common_components/LoadingSpinner";
import { getUserList, reset } from "../../../features/user/userSlice";
import ServerErrorPage from "../../Error/ServerErrorPage";
import SingleUserTableItem from "./components/SingleUserTableItem";

const UserList = () => {
  const dispatch = useDispatch();
  //get initial state from user store
  const { userList, isUserLoading, isUserError } = useSelector(
    (state) => state.user
  );
  //by default one time ,and then everytime pageNo changes call it..
  useEffect(() => {
    dispatch(getUserList());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  //if there are error
  if (isUserError) {
    return <ServerErrorPage />;
  }

  //if the page is loading
  if (isUserLoading) {
    return <LoadingSpinner />;
  }
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
          {userList &&
            userList.map((i, index) => {
              return (
                <SingleUserTableItem count={index + 1} {...i} key={index} />
              );
            })}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
};

export default UserList;
