//mdb
import { MDBBtn, MDBCol, MDBContainer, MDBInput } from "mdb-react-ui-kit";

const Login = () => {
  return (
    <MDBContainer className="vh-100 d-flex justify-content-center align-items-center">
      <MDBCol size="12" md="6" lg="3">
        {/* top */}
        <div className="top text-center">
          <h5 className="text-dark mb-4">Login to ExpoMStore</h5>
        </div>
        {/* login form */}
        <div className="login-form">
          {/* username */}
          <MDBInput type="text" label="Username" className="mb-2" size="sm" />
          {/* password */}
          <MDBInput
            type="password"
            label="Password"
            className="mb-3"
            size="sm"
          />
          {/* login btn */}
          <MDBBtn block className="rounded-0" size="sm">
            Login
          </MDBBtn>
        </div>
      </MDBCol>
    </MDBContainer>
  );
};

export default Login;
