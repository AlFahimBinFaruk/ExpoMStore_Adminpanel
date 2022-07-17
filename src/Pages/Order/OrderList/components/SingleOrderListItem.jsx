const SingleOrderListItem = ({
    id = "tst",
    total = 33,
    paymentStatus = "pending",
    orderStatus = "pending",
  }) => {
    return (
      <tr className="verticle-align-middle text-dark" role="button">
        {/* order id */}
        <td>
          <span className="fw-bold">Order Id:{id}</span>
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