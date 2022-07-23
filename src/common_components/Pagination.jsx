import { MDBPaginationItem, MDBPaginationLink } from "mdb-react-ui-kit";

const Pagination = ({ pageNo, setPageNo, totalPageCount }) => {
  return (
    <div className="d-flex justify-content-center my-5">
      <nav aria-label="Page navigation example">
        <ul className="pagination mb-0">
          <MDBPaginationItem>
            <MDBPaginationLink
              aria-label="Previous"
              onClick={() => setPageNo(pageNo - 1)}
            >
              <span aria-hidden="true">«</span>
            </MDBPaginationLink>
          </MDBPaginationItem>

          {[...Array(totalPageCount)].map((elementInArray, index) => (
            <MDBPaginationItem key={index} onClick={() => setPageNo(index + 1)}>
              <MDBPaginationLink>{index + 1}</MDBPaginationLink>
            </MDBPaginationItem>
          ))}

          <MDBPaginationItem>
            <MDBPaginationLink
              aria-label="Next"
              onClick={() => setPageNo(pageNo + 1)}
            >
              <span aria-hidden="true">»</span>
            </MDBPaginationLink>
          </MDBPaginationItem>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
