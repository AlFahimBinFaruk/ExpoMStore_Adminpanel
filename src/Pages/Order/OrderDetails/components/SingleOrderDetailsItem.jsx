const SingleOrderDetailsItem = ({
    id = 324,
    qty = 4,
    size = 43,
    color = "red",
    price = 43,
  }) => {
    return (
      <tr className="verticle-align-middle text-dark">
        {/* product id */}
        <td>
          <a href="/" className="fw-bold">
            Product Id:{id}
          </a>
        </td>
        <td>
          <span className="fw-bold">qty:{qty}</span>
        </td>
        <td>
          <span className="fw-bold">price:{price}</span>
        </td>
        <td>
          <span className="fw-bold">color:{color}</span>
        </td>
        <td>
          <span className="fw-bold">size:{size}</span>
        </td>
      </tr>
    );
  };
  
  export default SingleOrderDetailsItem;