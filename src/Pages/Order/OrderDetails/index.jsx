import {
  MDBBtn,
  MDBCol,
  MDBInput,
  MDBTable,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../../common_components/LoadingSpinner";
import {
  getOrderDetails,
  manageOrderStatus,
} from "../../../features/order/orderSlice";
import ServerErrorPage from "../../Error/ServerErrorPage";
import SingleOrderDetailsItem from "./components/SingleOrderDetailsItem";
import { useGlobalAlertContext } from "../../../contexts/alertContext";

const OrderDetails = () => {
  const { id } = useParams();
  let { setShowAlert } = useGlobalAlertContext();
  const dispatch = useDispatch();

  //get initial state from store
  const { orderDetails, isOrderLoading, isOrderError, isOrderSuccess } =
    useSelector((state) => state.order);
  //orderdetails info
  let { _id, userDetails, total, paymentStatus, orderStatus, tranId, address } =
    orderDetails || false;

  //new order staus
  const [newOrderStatus, setNewOrderStatus] = useState("");

  //handle order update status
  const handleOrderUpdateStatus = () => {
    if (newOrderStatus) {
      dispatch(
        manageOrderStatus({ id: _id, data: { status: newOrderStatus } })
      );
    }
  };

  //by default one time ,and then everytime pageNo changes call it..
  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  //if opt is successful
  if (isOrderSuccess) {
    setShowAlert({ msg: "Status updated!", color: "success" });
  }
  //if there are error
  if (isOrderError) {
    return <ServerErrorPage />;
  }
  //if the page is loading
  if (isOrderLoading) {
    return <LoadingSpinner />;
  }

  return (
    <MDBCol size="12" lg="6" className="mx-auto py-5">
      <h6 className="mb-4">Order Id:{_id}</h6>
      <MDBTable>
        {/* table body */}
        <MDBTableBody>
          {orderDetails?.orderDetails.map((i) => {
            return <SingleOrderDetailsItem {...i} />;
          })}
        </MDBTableBody>
      </MDBTable>
      <div className="my-5">
        <h6>
          <span className="text-muted">TranId:</span>${tranId}
        </h6>
        <h6>
          <span className="text-muted">Total:</span>${total}
        </h6>

        <h6>
          <span className="text-muted">payment status:</span>
          {paymentStatus}
        </h6>
        <h6>
          <span className="text-muted">address:</span>
          {address}
        </h6>
        <h6>
          <span className="text-muted">email:</span>
          {userDetails?.email}
        </h6>
      </div>
      {/* order status */}
      <div className="order status my-5">
        <h6>
          <span className="text-muted"> order status:</span>
          {orderStatus}
        </h6>
        {/* order staus selector */}
        <div className="mb-2">
          <small className="fw-bold">New order status:</small>
          <MDBInput
            type="text"
            value={newOrderStatus}
            onChange={(e) => setNewOrderStatus(e.target.value)}
          />
        </div>
        {/* update btn */}
        <MDBBtn block onClick={handleOrderUpdateStatus}>
          Update order status
        </MDBBtn>
      </div>
    </MDBCol>
  );
};

export default OrderDetails;
