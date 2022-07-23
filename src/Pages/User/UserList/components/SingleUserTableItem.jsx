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
  const handleSwitchChange = (isSelect, id) => {
    if (isSelect) {
      dispatch(manageUserStatus({ id, data: { status: "deactive" } }));
    }
    if (!isSelect) {
      dispatch(manageUserStatus({ id, data: { status: "active" } }));
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
          checked={status === "checked" ? true : false}
          onChange={(value) => handleSwitchChange(value, _id)}
        />
      </td>
    </tr>
  );
};

export default SingleUserTableItem;
