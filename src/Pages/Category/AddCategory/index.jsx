import { MDBBtn, MDBCol, MDBInput } from "mdb-react-ui-kit";

const AddCategory = () => {
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
              placeholder="Enter Your Category Name"
              size="sm"
            />
          </div>
          {/* category thmb */}
          <div className="mb-2">
            <small className="fw-bold">Select A Category Thumbnail:</small>
            <MDBInput type="file" size="sm" />
          </div>

          {/* handle submit btn */}
          <MDBBtn block size="sm" className="mt-3">
            Submit
          </MDBBtn>
        </div>
      </MDBCol>
    </div>
  );
};

export default AddCategory;
