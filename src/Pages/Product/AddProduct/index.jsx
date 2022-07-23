import { MDBBtn, MDBCol, MDBInput, MDBTextArea } from "mdb-react-ui-kit";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "../../../common_components/LoadingSpinner";
import { addProduct } from "../../../features/product/productSlice";
import { useGlobalAlertContext } from "../../../contexts/alertContext";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
const AddProduct = () => {
  let { setShowAlert } = useGlobalAlertContext();
  const dispatch = useDispatch();
  //get initial state from admin store
  const { isProductLoading, isProductError, isProductSuccess } = useSelector(
    (state) => state.product
  );
  //get initial state from admin store
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
  const [uploadProgress, setUploadProgress] = useState("");
  //handle change of input
  const handleChange = (e) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.id]: e.target.value,
      };
    });
  };
  //handle submit
  const handleSubmit = () => {
    if (title && thumbnail && categoryDetails && price && description) {
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
              price: Number(price),
              description,
              categoryId: categoryDetails.categoryId,
              categoryTitle: categoryDetails.categoryTitle,
            };
            //add product
            dispatch(addProduct(data));
          });
        }
      );
    } else {
      setShowAlert({ msg: "Provide all info", color: "danger" });
    }
  };

  //if added successfully
  if (isProductSuccess) {
    setShowAlert({ msg: "Category added", color: "success" });
  }

  //if there are error
  if (isProductError) {
    setShowAlert({ msg: "Failed to add category", color: "danger" });
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
                      value={`{categoryTitle:${i.title},categoryId:${i._id}}`}
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
