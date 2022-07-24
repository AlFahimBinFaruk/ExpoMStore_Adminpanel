import { MDBBtn, MDBCol, MDBInput, MDBTextArea } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "../../../common_components/LoadingSpinner";
import {
  getProductDetails,
  editProduct,
} from "../../../features/product/productSlice";
import { useGlobalAlertContext } from "../../../contexts/alertContext";
import PrevCategoryThumbnail from "../../../common_components/PrevThumbnail";
import { useParams } from "react-router-dom";
import handleFileUpload from "../../../utils/handleFileUpload";
const EditProduct = () => {
  let { id } = useParams();
  let { setShowAlert } = useGlobalAlertContext();
  const dispatch = useDispatch();
  const [thumbnailDeleted, setThumbnailDeleted] = useState(false);
  //get initial state from store
  const { productDetails, isProductLoading, isProductError, isProductSuccess } =
    useSelector((state) => state.product);
  //get initial state from category store
  const { categoryList } = useSelector((state) => state.category);

  //product details info
  let { _id, title, thumbnail, categoryDetails, price, description } =
    productDetails || false;

  //new form data
  const [newFormData, setNewFormData] = useState({
    newTitle: "",
    newCategoryDetails: "",
    newPrice: "",
    newDescription: "",
  });
  let { newTitle, newCategoryDetails, newPrice, newDescription } = newFormData;
  const [newThumbnail, setNewThumbnail] = useState("");

  if (thumbnail) {
    setThumbnailDeleted(false);
  }

  //handle change of input
  const handleChange = (e) => {
    setNewFormData((prevState) => {
      return {
        ...prevState,
        [e.target.id]: e.target.value,
      };
    });
  };

  //handle update
  const handleUpdate = () => {
    let data = {
      title: newTitle || title,
      categoryDetails: newCategoryDetails || categoryDetails,
      price: Number(newPrice) || price,
      description: newDescription || description,
    };
    if (thumbnailDeleted && newThumbnail) {
      handleFileUpload(newThumbnail)
        .then((res) => {
          console.log("res", res);
          data = { ...data, thumbnail: "F" };
          //edit category
          dispatch(editProduct({ id: _id, data }));
        })
        .catch(() => {
          setShowAlert({ msg: "Error Occrued!", color: "danger" });
        });
    } else {
      dispatch(editProduct({ id: _id, data }));
    }
  };

  //
  useEffect(() => {
    if (id) {
      dispatch(getProductDetails(id));
    }
  }, [dispatch, id]);

  //if added successfully
  if (isProductSuccess) {
    setShowAlert({ msg: "Category added", color: "success" });
  }
  //if there are error
  if (isProductError) {
    setShowAlert({ msg: "Failed to update category", color: "danger" });
  }

  //if the page is loading
  if (isProductLoading) {
    return <LoadingSpinner />;
  }
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
                <span className="text-dark fw-bold ms-1">{title}</span>
              </h6>
            </div>
            {/* new title */}
            <div className="mb-2">
              <small className="fw-bold">New Product Title:</small>
              <MDBInput
                type="text"
                id="newTitle"
                value={newTitle}
                onChange={handleChange}
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
                <span className="text-dark fw-bold ms-1">
                  {categoryDetails?.title}
                </span>
              </h6>
            </div>
            {/* new category */}
            <div className="mb-2">
              <small className="fw-bold">Select New Category:</small>
              <select
                class="form-select form-select-sm"
                id="newCategoryDetails"
                onChange={handleChange}
                aria-label="Default select example"
              >
                {categoryList &&
                  categoryList.categoryList.map((i) => {
                    return (
                      <option
                        value={`{categoryTitle:${i.title},categoryId:${i._id}}`}
                      >
                        {i.title}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          {/* product price */}
          <div className="product-price mt-4">
            {/* prev price */}
            <div className="mb-2">
              <h6>
                Prev Price:
                <span className="text-dark fw-bold ms-1">${price}</span>
              </h6>
            </div>
            {/* new price */}
            <div className="mb-2">
              <small className="fw-bold">New Price:</small>
              <MDBInput
                type="number"
                id="price"
                value={price}
                onChange={handleChange}
                placeholder="Enter Your Product Price"
                size="sm"
              />
            </div>
          </div>
          {/* product thmb */}
          <div className="product-thumb mt-4">
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
          {/* product desc */}
          <div className="product-desc mt-4">
            {/* prev desc */}
            <div className="mb-2">
              <h6>
                Prev Description:
                <span className="text-dark fw-bold ms-1">{description}</span>
              </h6>
            </div>
            {/* new desc */}
            <div className="mb-2">
              <small className="fw-bold">New Description:</small>
              <MDBTextArea
                rows={4}
                id="newDescription"
                value={newDescription}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* handle submit btn */}
          <MDBBtn block size="sm" className="mt-3" onClick={handleUpdate}>
            Update
          </MDBBtn>
        </div>
      </MDBCol>
    </div>
  );
};

export default EditProduct;
