import { MDBContainer, MDBNavbar, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
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

        <a href="/" className="fw-bold text-dark">
          My Account
        </a>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Header;
