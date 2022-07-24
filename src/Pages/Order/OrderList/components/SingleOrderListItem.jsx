import { Link } from "react-router-dom";

const SingleOrderListItem = ({
  count,
  _id,
  userDetails,
  orderDetails,
  total,
  paymentStatus,
  orderStatus,
  tranId,
}) => {
  return (
    <tr className="verticle-align-middle text-dark" role="button">
      {/* count */}
      <td>
        <span className="fw-bold">{count}</span>
      </td>
      {/* order id */}
      <td>
        <Link to={`/order/details/${_id}`}>
          <span className="fw-bold">Order Id:{_id}</span>
        </Link>
      </td>
      {/* tran id */}
      <td>
        <span className="fw-bold">TranId:{tranId}</span>
      </td>
      {/* price */}
      <td>
        <span className="fw-bold">Total:${total}</span>
      </td>
      <td>
        <span className="fw-bold">
          <span className="text-muted">Payment status</span>:{paymentStatus}
        </span>
      </td>
      <td>
        <span className="fw-bold">
          <span className="text-muted">Order Status</span>:{orderStatus}
        </span>
      </td>
    </tr>
  );
};

export default SingleOrderListItem;
