const SingleOrderDetailsItem = ({ productId, qty }) => {
  return (
    <tr className="verticle-align-middle text-dark">
      {/* product id */}
      <td>
        <a href="/" className="fw-bold">
          Product Id:{productId}
        </a>
      </td>
      <td>
        <span className="fw-bold">qty:{qty}</span>
      </td>
    </tr>
  );
};

export default SingleOrderDetailsItem;
