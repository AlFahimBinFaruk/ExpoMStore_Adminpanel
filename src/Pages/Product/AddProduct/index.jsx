import { MDBBtn, MDBCol, MDBInput, MDBTextArea } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "../../../common_components/LoadingSpinner";
import { addProduct } from "../../../features/product/productSlice";
import { getAllCategoryList } from "../../../features/category/categorySlice";
import { useGlobalAlertContext } from "../../../contexts/alertContext";
import handleFileUpload from "../../../utils/handleFileUpload";
const AddProduct = () => {
  let { setShowAlert } = useGlobalAlertContext();
  const dispatch = useDispatch();
  //get initial state from admin store
  const { isProductLoading, isProductError, isProductSuccess } = useSelector(
    (state) => state.product
  );
  //get initial state from category store
  const { categoryList } = useSelector((state) => state.category);

  //form data
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    categoryDetails: "",
  });
  let { title, price, description, categoryDetails } = formData;
  const [thumbnail, setThumbnail] = useState("");
  //upload progress
  //const [uploadProgress, setUploadProgress] = useState("");
  //handle change of input
  const handleChange = (e) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.id]: e.target.value,
      };
    });
  };

  //handle add product
  const handleAddProduct = (thumbnail) => {
    categoryDetails = JSON.parse(categoryDetails);
    const data = {
      title,
      thumbnail,
      price: Number(price),
      description,
      categoryId: categoryDetails.categoryId,
      categoryTitle: categoryDetails.categoryTitle,
    };

    //add product
    dispatch(addProduct(data));
    //if added successfully
    if (isProductSuccess) {
      setShowAlert({ msg: "Category added", color: "success" });
    }
  };
  //handle submit
  const handleSubmit = () => {
    if (title && thumbnail && categoryDetails && price && description) {
      handleFileUpload(thumbnail, handleAddProduct);
    } else {
      setShowAlert({ msg: "Provide all info", color: "danger" });
    }
  };

  useEffect(() => {
    //if there are error
    if (isProductError) {
      setShowAlert({ msg: "Failed to add category", color: "danger" });
    }
  }, [isProductError, setShowAlert]);

  //get all category list
  useEffect(() => {
    dispatch(getAllCategoryList());
  }, [dispatch]);

  //if the page is loading
  if (isProductLoading) {
    return <LoadingSpinner />;
  }
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
              id="title"
              value={title}
              onChange={handleChange}
              placeholder="Enter Your Product Title"
              size="sm"
            />
          </div>
          {/* product category */}
          <div className="mb-2">
            <small className="fw-bold">Select Product Category:</small>
            <select
              class="form-select form-select-sm"
              id="categoryDetails"
              onChange={handleChange}
              aria-label="Default select example"
            >
              {categoryList &&
                categoryList.categoryList.map((i) => {
                  return (
                    <option
                      value={`{"categoryTitle":"${i.title}","categoryId":"${i._id}"}`}
                    >
                      {i.title}
                    </option>
                  );
                })}
            </select>
          </div>
          {/* product price */}
          <div className="mb-2">
            <small className="fw-bold">Product Price:</small>
            <MDBInput
              type="number"
              id="price"
              value={price}
              onChange={handleChange}
              placeholder="Enter Your Product Price"
              size="sm"
            />
          </div>
          {/* product thmb */}
          <div className="mb-2">
            <small className="fw-bold">Select Product Thumbnail:</small>
            <MDBInput
              type="file"
              size="sm"
              onChange={(e) => setThumbnail(e.target.files[0])}
            />
          </div>
          {/* product desc */}
          <div className="mb-2">
            <small className="fw-bold">Product Description:</small>
            <MDBTextArea
              rows={4}
              id="description"
              value={description}
              onChange={handleChange}
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

export default AddProduct;
