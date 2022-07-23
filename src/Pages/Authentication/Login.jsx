import { MDBBtn, MDBCol, MDBContainer, MDBInput } from "mdb-react-ui-kit";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "../../common_components/LoadingSpinner";
import { useGlobalAlertContext } from "../../contexts/alertContext";
import { login } from "../../features/admin/adminSlice";

const Login = () => {
  let { setShowAlert } = useGlobalAlertContext();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  //get initial state from admin store
  const { isAdminLoading, isAdminError, isAdminSuccess, adminMessage } =
    useSelector((state) => state.admin);
  //form data
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;
  //handle change of input
  const handleChange = (e) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.id]: e.target.value,
      };
    });
  };

  //handle submit
  const handleSubmit = () => {
    //see if user provided all info
    if (username && password) {
      const data = {
        username,
        password,
      };
      dispatch(login(data));
    } else {
      setShowAlert({ msg: "Provide all info", color: "danger" });
    }
  };

  //if there are error
  if (isAdminError) {
    setShowAlert({
      msg: adminMessage,
      color: "danger",
    });
  }

  //if register is successfull
  if (isAdminSuccess) {
    setShowAlert({
      msg: "Login Successful!!",
      color: "success",
    });
    navigate("/");
  }

  //if the page is loading
  if (isAdminLoading) {
    return <LoadingSpinner />;
  }
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
          <MDBInput
            type="text"
            id="username"
            value={username}
            onChange={handleChange}
            label="Username"
            className="mb-2"
            size="sm"
          />
          {/* password */}
          <MDBInput
            type="password"
            id="password"
            value={password}
            onChange={handleChange}
            label="Password"
            className="mb-3"
            size="sm"
          />
          {/* login btn */}
          <MDBBtn block className="rounded-0" size="sm" onClick={handleSubmit}>
            Login
          </MDBBtn>
        </div>
      </MDBCol>
    </MDBContainer>
  );
};

export default Login;
