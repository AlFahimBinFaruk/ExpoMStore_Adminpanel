import { MDBBtn, MDBCol, MDBInput, MDBTextArea } from "mdb-react-ui-kit";
import PrevThumbnail from "../../../common_components/PrevThumbnail";

const EditProduct = () => {
  return (
    <div className="vh-100 d-flex align-items-center justify-content-center">
      <MDBCol size="12" md="6" lg="4">
        {/* top */}
        <div className="top">
          <h5 className="text-center text-dark">Edit product</h5>
        </div>
        {/* product form */}
        <div className="product-form mt-5">
          {/* product title */}
          <div className="product-title">
            {/* prev title */}
            <div className="mb-2">
              <h6>
                Prev Product Title:
                <span className="text-dark fw-bold ms-1">Test tiele</span>
              </h6>
            </div>
            {/* new title */}
            <div className="mb-2">
              <small className="fw-bold">New Product Title:</small>
              <MDBInput
                type="text"
                placeholder="Enter Your Product Title"
                size="sm"
              />
            </div>
          </div>
          {/* product category */}
          <div className="product-category mt-4">
            {/* prev category */}
            <div className="mb-2">
              <h6>
                Prev Category:
                <span className="text-dark fw-bold ms-1">Test tidfgele</span>
              </h6>
            </div>
            {/* new category */}
            <div className="mb-2">
              <small className="fw-bold">Select New Category:</small>
              <select
                class="form-select form-select-sm"
                aria-label="Default select example"
              >
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>
          {/* product price */}
          <div className="product-price mt-4">
            {/* prev price */}
            <div className="mb-2">
              <h6>
                Prev Price:
                <span className="text-dark fw-bold ms-1">$236</span>
              </h6>
            </div>
            {/* new price */}
            <div className="mb-2">
              <small className="fw-bold">New Price:</small>
              <MDBInput
                type="number"
                placeholder="Enter Your Product Price"
                size="sm"
              />
            </div>
          </div>
          {/* product thmb */}
          <div className="product-thumb mt-4">
            {/* prev-thumn */}
            {/* <PrevThumbnail/> */}
            {/* new thumb */}
            <div className="mb-2">
              <small className="fw-bold">Select New Thumbnail:</small>
              <MDBInput type="file" size="sm" />
            </div>
          </div>
          {/* product desc */}
          <div className="product-desc mt-4">
            {/* prev desc */}
            <div className="mb-2">
              <h6>
                Prev Description:
                <span className="text-dark fw-bold ms-1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
                  suscipit iusto quo, minus tempora dolores ut rerum ipsa quod
                  quaerat.
                </span>
              </h6>
            </div>
            {/* new desc */}
            <div className="mb-2">
              <small className="fw-bold">New Description:</small>
              <MDBTextArea rows={4} />
            </div>
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

export default EditProduct;
