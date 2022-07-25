import { MDBSwitch } from "mdb-react-ui-kit";
import { useDispatch } from "react-redux";
import { manageAdminStatus } from "../../../../features/admin/adminSlice";

const SingleAdminTableItem = ({
  count,
  _id,
  username,
  email,
  role,
  createdAt,
  status,
}) => {
  const dispatch = useDispatch();
  //handleSwitchChange
  const handleSwitchChange = (e, id) => {
    if (e.target.checked) {
      dispatch(manageAdminStatus({ id, data: { status: "active" } }));
    }
    if (!e.target.checked) {
      dispatch(manageAdminStatus({ id, data: { status: "deactive" } }));
    }
  };
  return (
    <tr>
      <th scope="row">{count}</th>
      <td>{_id}</td>
      <td>{username}</td>
      <td>{email}</td>
      <td>{role}</td>
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

export default SingleAdminTableItem;
