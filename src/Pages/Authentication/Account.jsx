import { MDBBtn, MDBCol, MDBIcon, MDBInput } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "../../common_components/LoadingSpinner";
import { useGlobalAlertContext } from "../../contexts/alertContext";
import { logout, changePassword } from "../../features/admin/adminSlice";
const Account = () => {
  let { setShowAlert } = useGlobalAlertContext();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  //get initial state from admin store
  const {
    adminInfo,
    isAdminLoading,
    isAdminError,
    isAdminSuccess,
    adminMessage,
  } = useSelector((state) => state.admin);
  //form data
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const { oldPassword, newPassword } = formData;
  //handle change of input
  const handleChange = (e) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.id]: e.target.value,
      };
    });
  };

  //handle change password
  const handleChangePassword = () => {
    //see if user provided all info
    if (oldPassword && newPassword) {
      const data = {
        oldPassword,
        newPassword,
      };
      dispatch(changePassword(data));
      //if password change is successfull
      if (isAdminSuccess) {
        handleLogout();
      }
    } else {
      setShowAlert({ msg: "Provide all info", color: "danger" });
    }
  };
  //handle logout
  const handleLogout = () => {
    dispatch(logout());
    //if register is successfull
    if (isAdminSuccess) {
      setShowAlert({
        msg: "Logout Successful!!",
        color: "success",
      });
      navigate("/");
    }
  };

  useEffect(() => {
    //if there are messages
    if (adminMessage) {
      setShowAlert({
        msg: adminMessage.message,
        color: "danger",
      });
    }
  }, [adminMessage, isAdminError, setShowAlert]);

  //if the page is loading
  if (isAdminLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <MDBCol size="12" md="6" lg="3">
        <h5 className="mb-5 text-dark text-center">
          Logged in as {adminInfo?.role}
        </h5>
        {/* top */}
        <div className="top d-flex justify-content-between align-items-baseline mb-3">
          <h6>Account Settings</h6>
          {/* logout btn */}
          <MDBIcon
            fas
            icon="sign-in-alt"
            role="button"
            color="danger"
            onClick={handleLogout}
          />
        </div>
        {/* account settings form */}
        <div className="account-settings-form">
          {/* username */}
          <div className="mb-3">
            {/* old */}
            <MDBInput
              label={adminInfo?.username}
              disabled
              className="mb-2"
              size="sm"
            />
          </div>
          {/* email */}
          <div className="mb-3">
            {/* old */}
            <MDBInput
              label={adminInfo?.email}
              disabled
              className="mb-2"
              size="sm"
            />
          </div>
          {/* password */}
          <div className="mb-3">
            {/* old */}
            <MDBInput
              type="password"
              id="oldPassword"
              value={oldPassword}
              onChange={handleChange}
              label="Enter Old Password"
              size="sm"
              className="mb-2"
            />
            {/* new */}
            <MDBInput
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={handleChange}
              label="New Password"
              size="sm"
            />
          </div>
          {/*  Change Password Creds btn */}
          <MDBBtn
            block
            className="rounded-0"
            size="sm"
            onClick={handleChangePassword}
          >
            Change Password Creds
          </MDBBtn>
        </div>
      </MDBCol>
    </div>
  );
};

export default Account;
