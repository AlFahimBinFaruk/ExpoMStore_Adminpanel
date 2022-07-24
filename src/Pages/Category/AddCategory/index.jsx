import { MDBBtn, MDBCol, MDBInput } from "mdb-react-ui-kit";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "../../../common_components/LoadingSpinner";
import { addCategory } from "../../../features/category/categorySlice";
import { useGlobalAlertContext } from "../../../contexts/alertContext";
import handleFileUpload from "../../../utils/handleFileUpload";

const AddCategory = () => {
  let { setShowAlert } = useGlobalAlertContext();
  const dispatch = useDispatch();
  //get initial state from admin store
  const { isCategoryLoading, isCategoryError, isCategorySuccess } = useSelector(
    (state) => state.category
  );
  //data
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  //handle submit
  const handleSubmit = async () => {
    if (title && thumbnail) {
      handleFileUpload(thumbnail)
        .then((res) => {
          console.log("res", res);
          const data = {
            title,
            thumbnail: "",
          };
          //add category
          dispatch(addCategory(data));
        })
        .catch(() => {
          setShowAlert({ msg: "Error Occrued!", color: "danger" });
        });
    } else {
      setShowAlert({ msg: "Provide all info", color: "danger" });
    }
  };

  //if added successfully
  if (isCategorySuccess) {
    setShowAlert({ msg: "Category added", color: "success" });
  }

  //if there are error
  if (isCategoryError) {
    setShowAlert({ msg: "Failed to add category", color: "danger" });
  }

  //if the page is loading
  if (isCategoryLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="vh-100 d-flex align-items-center justify-content-center">
      <MDBCol size="12" md="6" lg="4">
        {/* top */}
        <div className="top">
          <h5 className="text-center text-dark">Create a new category</h5>
        </div>
        {/* catogory form */}
        <div className="category-form">
          {/* category title */}
          <div className="mb-2">
            <small className="fw-bold">Category Title:</small>
            <MDBInput
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Your Category Name"
              size="sm"
            />
          </div>
          {/* category thmb */}
          <div className="mb-2">
            <small className="fw-bold">Select A Category Thumbnail:</small>
            <MDBInput
              type="file"
              onChange={(e) => setThumbnail(e.target.files[0])}
              size="sm"
            />
          </div>

          {/* handle submit btn */}
          <MDBBtn block size="sm" className="mt-3" onClick={handleSubmit}>
            Submit
          </MDBBtn>
        </div>
      </MDBCol>
    </div>
  );
};

export default AddCategory;
