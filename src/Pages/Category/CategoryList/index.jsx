import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "../../../common_components/LoadingSpinner";
import {
  getAllCategoryList,
  reset,
} from "../../../features/category/categorySlice";
import Pagination from "../../../common_components/Pagination";
import SingleCategoryTableItem from "./components/SingleCategoryTableItem";
import ServerErrorPage from "../../Error/ServerErrorPage";
import { useNavigate } from "react-router-dom";

const CategoryList = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [pageNo, setPageNo] = useState(1);
  //get initial state from admin store
  const { categoryList, isCategoryLoading, isCategoryError } = useSelector(
    (state) => state.category
  );
  //by default one time ,and then everytime pageNo changes call it..
  useEffect(() => {
    dispatch(getAllCategoryList(pageNo));

    return () => {
      dispatch(reset());
    };
  }, [dispatch, pageNo]);

  //if there are error
  if (isCategoryError) {
    return <ServerErrorPage />;
  }

  //if the page is loading
  if (isCategoryLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="category-list">
      {/* top */}
      <div className="top d-flex justify-content-between">
        <h5>Category list</h5>
        <MDBBtn color="success" onClick={() => navigate("/category/add")}>
          Add New
        </MDBBtn>
      </div>
      {/* category list */}
      <MDBTable className="my-5">
        <MDBTableHead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Id</th>
            <th scope="col">Title</th>
            <th scope="col">Thumbnail</th>
            <th scope="col">Status</th>
            <th scope="col">Edit</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {categoryList &&
            categoryList.categoryList.map((i, index) => {
              return (
                <SingleCategoryTableItem count={index + 1} {...i} key={index} />
              );
            })}
        </MDBTableBody>
      </MDBTable>
      {/* pagination */}
      <Pagination
        pageNo={pageNo}
        setPageNo={setPageNo}
        totalPageCount={categoryList?.totalPageCount}
      />
    </div>
  );
};

export default CategoryList;
