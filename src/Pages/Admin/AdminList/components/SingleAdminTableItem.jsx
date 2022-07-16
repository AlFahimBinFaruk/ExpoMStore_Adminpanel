import { MDBSwitch } from "mdb-react-ui-kit";

const SingleAdminTableItem = () => {
  return (
    <tr>
      <th scope="row">1</th>
      <td>4234</td>
      <td>Test title</td>
      <td>Test@title.com</td>
      <td>super admin</td>
      <td>12 july 2022</td>
      <td>
        <MDBSwitch id="flexSwitchCheckDefault" label="Active" />
      </td>
    </tr>
  );
};

export default SingleAdminTableItem;
