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

        <form className="d-flex input-group w-auto">
          <input
            type="search"
            className="form-control"
            placeholder="Type query"
            aria-label="Search"
          />
          <MDBBtn color="primary">Search</MDBBtn>
        </form>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Header;
