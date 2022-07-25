import { MDBSwitch, MDBIcon } from "mdb-react-ui-kit";
import { useDispatch } from "react-redux";
import { manageCategoryStatus } from "../../../../features/category/categorySlice";
import {useNavigate} from "react-router-dom"
const SingleCategoryTableItem = ({ count, _id, title, thumbnail, status }) => {
  let navigate=useNavigate()
  const dispatch = useDispatch();
  //handleSwitchChange
  const handleSwitchChange = (e, id) => {
    if (e.target.checked) {
      dispatch(manageCategoryStatus({ id, data: { status: "active" } }));
    }
    if (!e.target.checked) {
      dispatch(manageCategoryStatus({ id, data: { status: "deactive" } }));
    }
  };
  return (
    <tr>
      <th scope="row">{count}</th>
      <td>{_id}</td>
      <td>{title}</td>
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
          checked={status === "active" ? true : false}
          onChange={(e) => handleSwitchChange(e, _id)}
        />
      </td>
      <td>
        <MDBIcon far icon="edit" onClick={()=>navigate(`/category/edit/${_id}`)}/>
      </td>
    </tr>
  );
};

export default SingleCategoryTableItem;
