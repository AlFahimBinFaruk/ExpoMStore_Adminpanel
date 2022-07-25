import { MDBContainer, MDBNavbar, MDBIcon } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
const Header = () => {
  const handleToggle = () => {
    document.body.classList.toggle("sb-sidenav-toggled");
    localStorage.setItem(
      "sb|sidebar-toggle",
      document.body.classList.contains("sb-sidenav-toggled")
    );
  };
  return (
    <MDBNavbar light bgColor="light">
      <MDBContainer fluid>
        <MDBIcon
          fas
          icon="bars"
          id="sidebarToggle"
          onClick={handleToggle}
          role="button"
        />

        <Link to="/account">
          <span className="fw-bold text-dark">My Account</span>
        </Link>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Header;
