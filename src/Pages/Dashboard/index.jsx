import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import { useState } from "react";
import SingleDashboardCard from "./components/SingleDashboardCard";
const Dashboard = () => {
  const [count, setcount] = useState([1, 2, 3, 4, 56, 6]);
  return (
    <div className="dashboard">
      <h4 className="text-center">Welcome to Dashboard.</h4>
      <MDBRow className="gy-3 mt-5">
        {count.map((i) => {
          return (
            <MDBCol size="12" md="4" lg="3">
              <SingleDashboardCard />
            </MDBCol>
          );
        })}
      </MDBRow>
    </div>
  );
};

export default Dashboard;
