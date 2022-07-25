import { MDBBtn, MDBCol, MDBInput } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "../../../common_components/LoadingSpinner";
import {
  getCategoryDetails,
  editCategory,
} from "../../../features/category/categorySlice";
import { useGlobalAlertContext } from "../../../contexts/alertContext";
import PrevCategoryThumbnail from "../../../common_components/PrevThumbnail";
import { useParams } from "react-router-dom";
import handleFileUpload from "../../../utils/handleFileUpload";

const EditCategory = () => {
  let { id } = useParams();
  let { setShowAlert } = useGlobalAlertContext();
  const dispatch = useDispatch();
  const [thumbnailDeleted, setThumbnailDeleted] = useState(false);
  //get initial state from store
  const {
    categoryDetails,
    isCategoryLoading,
    isCategoryError,
    isCategorySuccess,
  } = useSelector((state) => state.category);
  //category details info
  let { _id, title, thumbnail } = categoryDetails ? categoryDetails : false;
  //new data
  const [newTitle, setNewTitle] = useState("");
  const [newThumbnail, setNewThumbnail] = useState("");

  //handle edit category
  const handleEditCategory = (newThumbnail) => {
    let data = {
      title: newTitle || title,
      thumbnail: newThumbnail || thumbnail,
    };
    dispatch(editCategory({ id: _id, data }));
    if (isCategorySuccess) {
      setShowAlert({ msg: "Category Updated.", color: "success" });
    }
  };

  //handle update
  const handleUpdate = () => {
    if (thumbnailDeleted && newThumbnail) {
      handleFileUpload(newThumbnail, handleEditCategory);
    } else {
      handleEditCategory();
    }
  };

  //get category details when the page loads
  useEffect(() => {
    if (id) {
      dispatch(getCategoryDetails(id));
    }
  }, [dispatch, id]);

  //if thumbnail is available then set thumnail deleted to false
  useEffect(() => {
    if (thumbnail) {
      setThumbnailDeleted(false);
    }
  }, [thumbnail]);

  useEffect(() => {
    //if there are error
    if (isCategoryError) {
      setShowAlert({ msg: "Failed to add category", color: "danger" });
    }
  }, [isCategoryError, setShowAlert]);

  //if the page is loading
  if (isCategoryLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center">
      {categoryDetails && (
        <MDBCol size="12" md="6" lg="4">
          {/* top */}
          <div className="top">
            <h5 className="text-center text-dark">Edit Category</h5>
          </div>
          {/* catogory form */}
          <div className="category-form mt-4">
            {/* category title */}
            <div className="category-title">
              {/* prev title */}
              <div className="mb-2">
                <h6>
                  Prev Category Title:
                  <span className="text-dark">{title}</span>
                </h6>
              </div>
              {/* new title */}
              <div className="mb-2">
                <small className="fw-bold">New Category Title:</small>
                <MDBInput
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Enter Your New Category Title"
                  size="sm"
                />
              </div>
            </div>
            {/* category thmb */}
            <div className="category-thumb">
              {thumbnailDeleted ? (
                <>
                  {/* new thumb */}
                  <div className="mb-2">
                    <small className="fw-bold">
                      Select A Category Thumbnail:
                    </small>
                    <MDBInput
                      type="file"
                      size="sm"
                      onChange={(e) => setNewThumbnail(e.target.files[0])}
                    />
                  </div>
                </>
              ) : (
                <>
                  {/* prev */}
                  <PrevCategoryThumbnail
                    thumbnail={thumbnail}
                    setThumbnailDeleted={setThumbnailDeleted}
                  />
                </>
              )}
            </div>

            {/* handle submit btn */}
            <MDBBtn block size="sm" className="mt-3" onClick={handleUpdate}>
              Update
            </MDBBtn>
          </div>
        </MDBCol>
      )}
    </div>
  );
};

export default EditCategory;
