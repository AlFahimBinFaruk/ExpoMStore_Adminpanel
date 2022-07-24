import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdb-react-ui-kit";

const SingleDashboardCard = ({title,value}) => {
  return (
    <MDBCard className="h-100 shadow">
      <MDBCardBody>
        <MDBCardTitle>{title}:</MDBCardTitle>
        <MDBCardText>{value}+</MDBCardText>
      </MDBCardBody>
    </MDBCard>
  );
};

export default SingleDashboardCard;
