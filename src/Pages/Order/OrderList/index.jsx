import { MDBCol, MDBTable, MDBTableBody } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "../../../common_components/LoadingSpinner";
import { getAllOrderList, reset } from "../../../features/order/orderSlice";
import Pagination from "../../../common_components/Pagination";
import ServerErrorPage from "../../Error/ServerErrorPage";
import SingleOrderListItem from "./components/SingleOrderListItem";

const OrderList = () => {
  const dispatch = useDispatch();
  const [pageNo, setPageNo] = useState(1);
  //get initial state from store
  const { orderList, isOrderLoading, isOrderError } = useSelector(
    (state) => state.order
  );

  //by default one time ,and then everytime pageNo changes call it..
  useEffect(() => {
    dispatch(getAllOrderList(pageNo));

    return () => {
      dispatch(reset());
    };
  }, [dispatch, pageNo]);

  //if there are error
  if (isOrderError) {
    return <ServerErrorPage />;
  }
  //if the page is loading
  if (isOrderLoading) {
    return <LoadingSpinner />;
  }

  return (
    <MDBCol size="12" lg="8" className="mx-auto">
      <div className="mb-5 text-center">
        <h5>Order history</h5>
      </div>

      <MDBTable>
        {/* table body */}
        <MDBTableBody>
          {orderList &&
            orderList.orderList.map((i, index) => {
              return (
                <SingleOrderListItem count={index + 1} {...i} key={index} />
              );
            })}
        </MDBTableBody>
      </MDBTable>
      {/* pagination */}
      <Pagination
        pageNo={pageNo}
        setPageNo={setPageNo}
        totalPageCount={orderList?.totalPageCount}
      />
    </MDBCol>
  );
};

export default OrderList;
