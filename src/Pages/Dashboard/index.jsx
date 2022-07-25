import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "../../common_components/LoadingSpinner";
import {
  getDashboardOverview,
  reset,
} from "../../features/dashboard/dashboardSlice";
import ServerErrorPage from "../Error/ServerErrorPage";
import SingleDashboardCard from "./components/SingleDashboardCard";

const Dashboard = () => {
  const dispatch = useDispatch();
  //get initial state from admin store
  const { dashboardDetails, isDashboardLoading, isDashboardError } =
    useSelector((state) => state.dashboard);
  //by default one time ,and then everytime pageNo changes call it..
  useEffect(() => {
    dispatch(getDashboardOverview());

    // return () => {
    //   dispatch(reset());
    // };
  }, [dispatch]);

  //if there are error
  if (isDashboardError) {
    return <ServerErrorPage />;
  }

  //if the page is loading
  if (isDashboardLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="dashboard">
      <h4 className="text-center">Welcome to Dashboard.</h4>
      <MDBRow className="gy-3 mt-5">
        {dashboardDetails &&
          Object.keys(dashboardDetails).map(function (key) {
            return (
              <MDBCol size="12" md="4" lg="3">
                <SingleDashboardCard
                  title={key}
                  value={dashboardDetails[key]}
                />
              </MDBCol>
            );
          })}
      </MDBRow>
    </div>
  );
};

export default Dashboard;
