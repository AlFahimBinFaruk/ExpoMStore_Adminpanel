import { MDBSwitch, MDBIcon } from "mdb-react-ui-kit";
import { useDispatch } from "react-redux";
import { manageProductStatus } from "../../../../features/product/productSlice";

const SingleProductTableItem = ({
  count,
  _id,
  title,
  categoryDetails,
  thumbnail,
  price,
  status,
}) => {
  const dispatch = useDispatch();
  //handleSwitchChange
  const handleSwitchChange = (isSelect, id) => {
    if (isSelect) {
      dispatch(manageProductStatus({ id, data: { status: "deactive" } }));
    }
    if (!isSelect) {
      dispatch(manageProductStatus({ id, data: { status: "active" } }));
    }
  };
  return (
    <tr>
      <th scope="row">{count}</th>
      <td>{_id}</td>
      <td>{title}</td>
      <td>{price}</td>
      <td>{categoryDetails.title}</td>
      <td>
        <img
          src={thumbnail}
          height={30}
          width={30}
          className="rounded-circle"
          alt="Fissure in Sandstone"
        />
      </td>
      <td>
        <MDBSwitch
          id="flexSwitchCheckDefault"
          label={status}
          checked={status === "checked" ? true : false}
          onChange={(value) => handleSwitchChange(value, _id)}
        />
      </td>
      <td>
        <MDBIcon far icon="edit" />
      </td>
    </tr>
  );
};

export default SingleProductTableItem;
