import { MDBSwitch, MDBIcon } from "mdb-react-ui-kit";

const SingleProductTableItem = () => {
  return (
    <tr>
      <th scope="row">1</th>
      <td>4234</td>
      <td>Test title</td>
      <td>Test category</td>
      <td>
        <img
          src="https://th.bing.com/th/id/OIP.iN7b7OveHW9aSx611Yh0owHaHa?w=186&h=186&c=7&r=0&o=5&pid=1.7"
          height={30}
          width={30}
          className="rounded-circle"
          alt="Fissure in Sandstone"
        />
      </td>
      <td>
        <MDBSwitch id="flexSwitchCheckDefault" label="Active" />
      </td>
      <td>
        <MDBIcon far icon="edit" />
      </td>
    </tr>
  );
};

export default SingleProductTableItem;
