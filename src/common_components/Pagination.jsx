import { MDBPaginationItem, MDBPaginationLink } from "mdb-react-ui-kit";

const Pagination = () => {
  return (
    <div className="d-flex justify-content-center my-5">
      <nav aria-label="Page navigation example">
        <ul className="pagination mb-0">
          <MDBPaginationItem>
            <MDBPaginationLink href="#" aria-label="Previous">
              <span aria-hidden="true">«</span>
            </MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink href="#">1</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink href="#">2</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink href="#">3</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink href="#" aria-label="Next">
              <span aria-hidden="true">»</span>
            </MDBPaginationLink>
          </MDBPaginationItem>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
