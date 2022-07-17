//mdb
import { MDBBtn, MDBCol, MDBContainer, MDBInput } from "mdb-react-ui-kit";

const Register = () => {
  return (
    <MDBContainer className="vh-100 d-flex justify-content-center align-items-center">
      <MDBCol size="12" md="6" lg="3">
        {/* top */}
        <div className="top text-center">
          <h5 className="text-dark mb-4">Register to ExpoMStore</h5>
        </div>
        {/* register form */}
        <div className="register-form">
          {/* username */}
          <MDBInput type="text" label="Username" className="mb-2" size="sm" />
          {/* email */}
          <MDBInput type="email" label="Email" className="mb-2" size="sm" />
          {/* role */}
          <div className="mb-2">
            <small className="fw-bold">Select Your Role:</small>
            <select className="form-select form-select-sm">
              <option value="admin">Admin</option>
              <option value="delivery-man">Delivery Man</option>
            </select>
          </div>
          {/* password */}
          <MDBInput
            type="password"
            label="Password"
            className="mb-3"
            size="sm"
          />
          {/*Register btn */}
          <MDBBtn block className="rounded-0" size="sm">
            Register
          </MDBBtn>
        </div>
      </MDBCol>
    </MDBContainer>
  );
};

export default Register;
