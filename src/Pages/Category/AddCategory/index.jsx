import { MDBBtn, MDBCol, MDBInput } from "mdb-react-ui-kit";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "../../../common_components/LoadingSpinner";
import { addCategory } from "../../../features/category/categorySlice";
import { useGlobalAlertContext } from "../../../contexts/alertContext";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

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
  //upload progress
  const [uploadProgress, setUploadProgress] = useState("");
  //handle submit
  const handleSubmit = () => {
    if (title && thumbnail) {
      const storage = getStorage();
      const storageRef = ref(storage, thumbnail.name + new Date());
      const uploadTask = uploadBytesResumable(storageRef, thumbnail);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
          // eslint-disable-next-line default-case
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // eslint-disable-next-line default-case
          switch (error.code) {
            case "storage/unauthorized":
              break;
            case "storage/canceled":
              break;
            case "storage/unknown":
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const data = {
              title,
              thumbnail: downloadURL,
            };
            //add category
            dispatch(addCategory(data));
          });
        }
      );
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
