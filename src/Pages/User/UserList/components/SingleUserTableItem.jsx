import { MDBSwitch } from "mdb-react-ui-kit";
import { useDispatch } from "react-redux";
import { manageUserStatus } from "../../../../features/user/userSlice";

const SingleUserTableItem = ({
  count,
  _id,
  username,
  email,
  createdAt,
  status,
}) => {
  const dispatch = useDispatch();
  //handleSwitchChange
  const handleSwitchChange = (e, id) => {
    if (e.target.checked) {
      dispatch(manageUserStatus({ id, data: { status: "active" } }));
    }
    if (!e.target.checked) {
      dispatch(manageUserStatus({ id, data: { status: "deactive" } }));
    }
  };
  return (
    <tr>
      <th scope="row">{count}</th>
      <td>{_id}</td>
      <td>{username}</td>
      <td>{email}</td>
      <td>{createdAt}</td>
      <td>
        <MDBSwitch
          id="flexSwitchCheckDefault"
          label={status}
          checked={status === "active" ? true : false}
          onChange={(value) => handleSwitchChange(value, _id)}
        />
      </td>
    </tr>
  );
};

export default SingleUserTableItem;
