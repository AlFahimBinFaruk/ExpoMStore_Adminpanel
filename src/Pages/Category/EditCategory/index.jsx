import { MDBBtn, MDBCol, MDBInput } from "mdb-react-ui-kit";
import PrevCategoryThumbnail from "../../../common_components/PrevThumbnail";

const EditCategory = () => {
  return (
    <div className="vh-100 d-flex align-items-center justify-content-center">
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
                Prev Category Title :{" "}
                <span className="text-dark">Test tiele</span>
              </h6>
            </div>
            {/* new title */}
            <div className="mb-2">
              <small className="fw-bold">New Category Title:</small>
              <MDBInput
                type="text"
                placeholder="Enter Your New Category Title"
                size="sm"
              />
            </div>
          </div>
          {/* category thmb */}
          <div className="category-thumb">
            {/* prev */}
            <PrevCategoryThumbnail />
            {/* new thumb */}
            {/* <div className="mb-2">
            <small className="fw-bold">Select A Category Thumbnail:</small>
            <MDBInput type="file" size="sm" />
          </div> */}
          </div>

          {/* handle submit btn */}
          <MDBBtn block size="sm" className="mt-3">
            Update
          </MDBBtn>
        </div>
      </MDBCol>
    </div>
  );
};

export default EditCategory;
