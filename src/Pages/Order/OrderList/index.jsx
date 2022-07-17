import { MDBCol, MDBTable, MDBTableBody } from "mdb-react-ui-kit";
import { useState } from "react";
import SingleOrderListItem from "./components/SingleOrderListItem";

const OrderList = () => {
  const [count, setcount] = useState([1, 2, 3, 4, 5, 6]);
  return (
    <MDBCol size="12" lg="8" className="mx-auto">
      <div className="mb-5 text-center">
        <h5>Order history</h5>
      </div>

      <MDBTable>
        {/* table body */}
        <MDBTableBody>
          {count.map((i) => {
            return <SingleOrderListItem />;
          })}
        </MDBTableBody>
      </MDBTable>
    </MDBCol>
  );
};

export default OrderList;
