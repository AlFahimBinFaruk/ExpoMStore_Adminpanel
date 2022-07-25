import { MDBBtn, MDBCol, MDBContainer, MDBInput } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "../../common_components/LoadingSpinner";
import { useGlobalAlertContext } from "../../contexts/alertContext";
import { register } from "../../features/admin/adminSlice";
const Register = () => {
  let { setShowAlert } = useGlobalAlertContext();
  const dispatch = useDispatch();
  //get initial state from admin store
  const { isAdminLoading, isAdminSuccess, adminMessage } =
    useSelector((state) => state.admin);
  //form data
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const { username, email, password, role } = formData;
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
    if (username && email && role && password) {
      const data = {
        username,
        email,
        password,
        role,
      };
      dispatch(register(data));
      //if register is successfull
      if (isAdminSuccess) {
        setShowAlert({
          msg: "Registered,wait for admin to approve.",
          color: "success",
        });
      }
    } else {
      setShowAlert({ msg: "Provide all info", color: "danger" });
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
  }, [adminMessage, setShowAlert]);

  //if the page is loading
  if (isAdminLoading) {
    return <LoadingSpinner />;
  }
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
          <MDBInput
            type="text"
            id="username"
            value={username}
            onChange={handleChange}
            label="Username"
            className="mb-2"
            size="sm"
          />
          {/* email */}
          <MDBInput
            type="email"
            id="email"
            value={email}
            onChange={handleChange}
            label="Email"
            className="mb-2"
            size="sm"
          />
          {/* role */}
          <div className="mb-2">
            <small className="fw-bold">Select Your Role:</small>
            <select
              className="form-select form-select-sm"
              id="role"
              value={role}
              onChange={handleChange}
            >
              <option value="admin">Admin</option>
              <option value="delivery-man">Delivery Man</option>
            </select>
          </div>
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
          {/*Register btn */}
          <MDBBtn block className="rounded-0" size="sm" onClick={handleSubmit}>
            Register
          </MDBBtn>
        </div>
      </MDBCol>
    </MDBContainer>
  );
};

export default Register;
