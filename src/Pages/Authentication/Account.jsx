//mdb
import { MDBBtn, MDBCol, MDBIcon, MDBInput } from "mdb-react-ui-kit";

const Account = () => {
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <MDBCol size="12" md="6" lg="3">
        <h5 className="mb-5 text-dark text-center">Logged in as Manager</h5>
        {/* top */}
        <div className="top d-flex justify-content-between align-items-baseline mb-3">
          <h6>Account Settings</h6>
          {/* logout btn */}
          <MDBIcon fas icon="sign-in-alt" role="button" color="danger" />
        </div>
        {/* account settings form */}
        <div className="account-settings-form">
          {/* username */}
          <div className="mb-3">
            {/* old */}
            <MDBInput label="John Doe" disabled className="mb-2" size="sm" />
            {/* new */}
            <MDBInput type="text" label="New Username" size="sm" />
          </div>
          {/* email */}
          <div className="mb-3">
            {/* old */}
            <MDBInput
              label="John@gmail.com"
              disabled
              className="mb-2"
              size="sm"
            />
            {/* new */}
            <MDBInput type="email" label="New Email" size="sm" />
          </div>
          {/* password */}
          <div className="mb-3">
            {/* new */}
            <MDBInput
              type="password"
              label="Enter Old Password"
              size="sm"
              className="mb-2"
            />
            {/* new */}
            <MDBInput type="password" label="New Password" size="sm" />
          </div>
          {/* Update Account Creds btn */}
          <MDBBtn block className="rounded-0" size="sm">
            Update Account Creds
          </MDBBtn>
        </div>
      </MDBCol>
    </div>
  );
};

export default Account;
