import { MDBSwitch, MDBIcon } from "mdb-react-ui-kit";

const SingleCategoryTableItem = () => {
  return (
    <tr>
      <th scope="row">1</th>
      <td>4234</td>
      <td>Test title</td>
      <td>
        <MDBSwitch id="flexSwitchCheckDefault" label="Active" />
      </td>
      <td>
        <MDBIcon far icon="edit" />
      </td>
    </tr>
  );
};

export default SingleCategoryTableItem;
