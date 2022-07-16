import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdb-react-ui-kit";

const SingleDashboardCard = () => {
  return (
    <MDBCard className="h-100 shadow">
      <MDBCardBody>
        <MDBCardTitle>Total Users:</MDBCardTitle>
        <MDBCardText>9+</MDBCardText>
      </MDBCardBody>
    </MDBCard>
  );
};

export default SingleDashboardCard;
