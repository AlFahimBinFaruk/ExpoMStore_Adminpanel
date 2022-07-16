import { MDBBtn, MDBCol, MDBInput, MDBTextArea } from "mdb-react-ui-kit";

const AddProduct = () => {
  return (
    <div className="vh-100 d-flex align-items-center justify-content-center">
      <MDBCol size="12" md="6" lg="4">
        {/* top */}
        <div className="top">
          <h5 className="text-center text-dark">Add a new product</h5>
        </div>
        {/* product form */}
        <div className="product-form">
          {/* product title */}
          <div className="mb-2">
            <small className="fw-bold">Product Title:</small>
            <MDBInput
              type="text"
              placeholder="Enter Your Product Title"
              size="sm"
            />
          </div>
          {/* product category */}
          <div className="mb-2">
            <small className="fw-bold">Select Product Category:</small>
            <select
              class="form-select form-select-sm"
              aria-label="Default select example"
            >
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          {/* product price */}
          <div className="mb-2">
            <small className="fw-bold">Product Price:</small>
            <MDBInput
              type="number"
              placeholder="Enter Your Product Price"
              size="sm"
            />
          </div>
          {/* product thmb */}
          <div className="mb-2">
            <small className="fw-bold">Select Product Thumbnail:</small>
            <MDBInput type="file" size="sm" />
          </div>
          {/* product desc */}
          <div className="mb-2">
            <small className="fw-bold">Product Description:</small>
            <MDBTextArea rows={4} />
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

export default AddProduct;
